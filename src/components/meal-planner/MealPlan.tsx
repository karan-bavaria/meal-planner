import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DaySummary as DaySummaryType } from '@/types';

interface MealPlanProps {
  daySummary: DaySummaryType;
}

export function MealPlan({ daySummary }: MealPlanProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Meal Plan</CardTitle>
        <CardDescription>
          Your personalized meals with detailed explanations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {daySummary.explanations.map((explanation, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{explanation.meal}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xl font-semibold text-primary">
                  {explanation.food.name}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{explanation.food.calories} cal</Badge>
                  <Badge variant="outline">{explanation.food.protein_g}g protein</Badge>
                  <Badge variant="outline">{explanation.food.fiber_g}g fiber</Badge>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {explanation.rationale}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
