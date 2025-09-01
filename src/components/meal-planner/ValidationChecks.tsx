import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';
import { DaySummary as DaySummaryType } from '@/types';

interface ValidationChecksProps {
  daySummary: DaySummaryType;
}

export function ValidationChecks({ daySummary }: ValidationChecksProps) {
  const { validation_checks } = daySummary;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validation Checks</CardTitle>
        <CardDescription>Automated verification of your meal plan</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 w-full ">
          <div
            className={`w-full max-w-none p-2 rounded-lg  border-1 text-sm
              ${
                validation_checks.allergens_clear
                  ? 'border-green-200 bg-green-50 dark:bg-green-950'
                  : 'border-red-200 bg-red-50 dark:bg-red-950'
              }
            `}
          >
            <div className="flex items-center gap-2 w-full">
              <span
                className={`w-full
                  ${
                    validation_checks.allergens_clear
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }
                `}
              >
                No excluded allergens present
              </span>
            </div>
          </div>

          <div
            className={`w-full max-w-none p-2 rounded-lg  border-1 text-sm
              ${
              validation_checks.calories_within_range
                ? 'border-green-200 bg-green-50 dark:bg-green-950'
                : 'border-red-200 bg-red-50 dark:bg-red-950'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  validation_checks.calories_within_range
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }
              >
                Calories within ±10% of target
              </span>
            </div>
          </div>

          <div
            className={`w-full max-w-none p-2 rounded-lg  border-1 text-sm
              ${
              validation_checks.all_meals_explained
                ? 'border-green-200 bg-green-50 dark:bg-green-950'
                : 'border-red-200 bg-red-50 dark:bg-red-950'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  validation_checks.all_meals_explained
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }
              >
                All meals have explanations
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
