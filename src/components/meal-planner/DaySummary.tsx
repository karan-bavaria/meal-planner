import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DaySummary as DaySummaryType } from '@/types';

interface DaySummaryProps {
  daySummary: DaySummaryType;
}

export function DaySummary({ daySummary }: DaySummaryProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Day Summary</CardTitle>
        <CardDescription>
          Your personalized meal plan overview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{daySummary.day_summary}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Calories</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {daySummary.meal_plan.total_calories}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">Protein</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {daySummary.meal_plan.total_protein}g
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border">
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Fiber</div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {daySummary.meal_plan.total_fiber}g
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Carbs</div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {daySummary.meal_plan.total_carbs}g
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
