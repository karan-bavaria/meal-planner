import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DaySummary as DaySummaryType, Food } from '@/types';
import { ShoppingCart, Package, Clock } from 'lucide-react';

interface GroceryListProps {
  daySummary: DaySummaryType;
}

interface GroceryItem {
  name: string;
  category: string;
  estimatedQuantity: string;
  priceTier: number;
  prepTime: number;
}

export function GroceryList({ daySummary }: GroceryListProps) {
  const generateGroceryList = (daySummary: DaySummaryType): GroceryItem[] => {
    const meals = [
      daySummary.meal_plan.breakfast,
      daySummary.meal_plan.lunch,
      daySummary.meal_plan.dinner,
      daySummary.meal_plan.snack
    ];

    const groceryItems: GroceryItem[] = [];

    meals.forEach(meal => {
      const item: GroceryItem = {
        name: meal.name,
        category: getCategory(meal),
        estimatedQuantity: getQuantity(meal),
        priceTier: meal.price_tier,
        prepTime: meal.prep_time_min
      };
      groceryItems.push(item);
    });

    return groceryItems.sort((a, b) => a.category.localeCompare(b.category));
  };

  const getCategory = (food: Food): string => {
    const name = food.name.toLowerCase();
    
    if (name.includes('yogurt') || name.includes('cheese') || name.includes('milk')) {
      return 'Dairy';
    }
    if (name.includes('chicken') || name.includes('salmon') || name.includes('egg')) {
      return 'Protein';
    }
    if (name.includes('oatmeal') || name.includes('quinoa') || name.includes('rice') || name.includes('bread')) {
      return 'Grains';
    }
    if (name.includes('banana') || name.includes('apple') || name.includes('orange') || name.includes('blueberry') || name.includes('strawberry')) {
      return 'Fruits';
    }
    if (name.includes('spinach') || name.includes('broccoli') || name.includes('carrot') || name.includes('tomato') || name.includes('lettuce')) {
      return 'Vegetables';
    }
    if (name.includes('almond') || name.includes('walnut') || name.includes('nut') || name.includes('butter')) {
      return 'Nuts & Seeds';
    }
    if (name.includes('oil') || name.includes('avocado')) {
      return 'Fats & Oils';
    }
    if (name.includes('bean') || name.includes('lentil') || name.includes('chickpea')) {
      return 'Legumes';
    }
    
    return 'Other';
  };

  const getQuantity = (food: Food): string => {
    const name = food.name.toLowerCase();
    
    if (name.includes('yogurt')) return '1 container (6oz)';
    if (name.includes('oatmeal')) return '1 cup dry';
    if (name.includes('quinoa')) return '1 cup dry';
    if (name.includes('salmon')) return '6oz fillet';
    if (name.includes('chicken')) return '6oz breast';
    if (name.includes('egg')) return '2 large eggs';
    if (name.includes('banana')) return '1 medium';
    if (name.includes('apple')) return '1 medium';
    if (name.includes('almond')) return '1/4 cup';
    if (name.includes('spinach')) return '2 cups fresh';
    if (name.includes('broccoli')) return '1 head';
    if (name.includes('avocado')) return '1 medium';
    if (name.includes('bread')) return '2 slices';
    if (name.includes('rice')) return '1 cup cooked';
    if (name.includes('bean')) return '1 can (15oz)';
    if (name.includes('oil')) return '1 tbsp';
    
    return '1 serving';
  };

  const getPriceTierLabel = (tier: number): string => {
    switch (tier) {
      case 1: return 'Budget';
      case 2: return 'Moderate';
      case 3: return 'Premium';
      case 4: return 'Premium+';
      default: return 'Standard';
    }
  };

  const getPriceTierVariant = (tier: number): "default" | "secondary" | "destructive" | "outline" => {
    switch (tier) {
      case 1: return 'secondary';
      case 2: return 'default';
      case 3: return 'outline';
      case 4: return 'destructive';
      default: return 'default';
    }
  };

  const groceryItems = generateGroceryList(daySummary);
  const categories = [...new Set(groceryItems.map(item => item.category))];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Grocery List
        </CardTitle>
        <CardDescription>
          Ingredients needed for your meal plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
              <div className="grid gap-3">
                {groceryItems
                  .filter(item => item.category === category)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {item.estimatedQuantity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.prepTime}min prep
                          </span>
                        </div>
                      </div>
                      <Badge variant={getPriceTierVariant(item.priceTier)}>
                        {getPriceTierLabel(item.priceTier)}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Shopping Tips</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Buy fresh produce for the week to ensure quality</li>
              <li>• Consider buying in bulk for items you use frequently</li>
              <li>• Check for sales on premium items to save money</li>
              <li>• Store perishables properly to extend shelf life</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
