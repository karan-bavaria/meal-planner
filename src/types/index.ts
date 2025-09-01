export interface Food {
  name: string;
  calories: number;
  allergens: string;
  protein_g: number;
  fiber_g: number;
  carbs_g: number;
  fat_g: number;
  cuisine: string;
  glycemic_index: number;
  price_tier: number;
  prep_time_min: number;
}

export interface ParsedProfile {
  calorie_target: number;
  exclude_allergens: string[];
  dietary_preferences: string[];
  macro_preferences: {
    high_protein?: boolean;
    high_fiber?: boolean;
    low_carb?: boolean;
    low_fat?: boolean;
  };
  budget_preference: 'low' | 'medium' | 'high';
  prep_time_limit: number;
}

export interface MealPlan {
  breakfast: Food;
  lunch: Food;
  dinner: Food;
  snack: Food;
  total_calories: number;
  total_protein: number;
  total_fiber: number;
  total_carbs: number;
  total_fat: number;
}

export interface MealExplanation {
  meal: string;
  food: Food;
  rationale: string;
}

export interface DaySummary {
  profile_used: ParsedProfile;
  meal_plan: MealPlan;
  explanations: MealExplanation[];
  day_summary: string;
  validation_checks: {
    allergens_clear: boolean;
    calories_within_range: boolean;
    all_meals_explained: boolean;
  };
}
