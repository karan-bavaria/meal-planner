# Digbi Health Meal Planner

A deterministic meal planning system that converts free-text dietary profiles into structured meal plans with explanations.

## Problem Framing

- **Input Challenge**: Parse messy, natural language dietary preferences into structured constraints
- **Planning Challenge**: Generate deterministic meal plans that respect all constraints while optimizing for user preferences
- **Explanation Challenge**: Provide human-readable justifications for each meal choice

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Food Dataset Schema

The `foods.csv` includes these attributes:

- **name**: Food item name
- **calories**: Energy content per serving
- **allergens**: Comma-separated allergen list (none, peanuts, tree_nuts, dairy, wheat, soy, eggs, fish)
- **protein_g**: Protein content in grams
- **fiber_g**: Dietary fiber content in grams  
- **carbs_g**: Carbohydrate content in grams
- **fat_g**: Fat content in grams
- **cuisine**: Cultural origin (american, mediterranean, asian, etc.)
- **glycemic_index**: Blood sugar impact (0-100, lower is better)
- **price_tier**: Cost level (1=budget, 2=moderate, 3=premium)
- **prep_time_min**: Preparation time in minutes

## Profile Schema

```typescript
interface ParsedProfile {
  calorie_target: number;
  exclude_allergens: string[];
  dietary_preferences: string[]; // vegetarian, vegan, keto, paleo
  macro_preferences: {
    high_protein?: boolean;
    high_fiber?: boolean;
    low_carb?: boolean;
    low_fat?: boolean;
  };
  budget_preference: 'low' | 'medium' | 'high';
  prep_time_limit: number;
}
```

## Sample Profiles

1. **Primary**: "38f, vegetarian, avoid peanuts; weight loss ~1600 kcal; prefers higher protein & fiber."
2. **Keto**: "25m, keto diet, no dairy; muscle gain ~2200 kcal; high protein, low carb, budget conscious."
3. **Complex**: "45f, vegan, gluten-free, allergic to tree nuts; maintenance ~1800 kcal; quick prep meals only, premium budget."

## Scoring Strategy

The deterministic planner uses a weighted scoring system:

- **Macro preferences**: +2 points per gram protein (if high_protein), +3 points per gram fiber (if high_fiber)
- **Meal appropriateness**: +10-12 points for contextually appropriate foods (oatmeal for breakfast, salmon for dinner)
- **Glycemic index**: +0.1 points per point below 100 (lower GI preferred)
- **Prep time**: -0.2 points per minute (faster prep preferred)
- **Calorie targeting**: Primary sort by proximity to target calories per meal

## Fallback Strategy

- **Missing calorie target**: Default to 1600 kcal
- **No suitable foods**: Throw error with clear message
- **Impossible constraints**: Gracefully degrade constraints (e.g., increase prep time limit)
- **Allergen conflicts**: Strict filtering - no compromises on safety

## Deterministic Guarantee

The system is deterministic because:
1. **Fixed scoring weights** ensure consistent food rankings
2. **Stable sort** prioritizes calorie proximity, then score
3. **No randomization** in any selection process
4. **Consistent filtering** order for constraint application

## Features

- **Profile Parsing**: Converts natural language to structured JSON
- **Meal Planning**: 4-meal day (breakfast, lunch, dinner, snack) within ±10% calorie target
- **Explanations**: Human-readable rationale for each meal choice
- **Substitutions**: Handle plain-English tweaks like "lower carb lunch"
- **Validation**: Automatic checks for allergens, calories, and completeness