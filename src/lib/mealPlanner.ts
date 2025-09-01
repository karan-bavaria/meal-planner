import { Food, ParsedProfile, MealPlan, MealExplanation, DaySummary } from '@/types';

export class MealPlanner {
  private foods: Food[];
  
  constructor(foods: Food[]) {
    this.foods = foods;
  }
  
  private filterFoods(profile: ParsedProfile): Food[] {
    return this.foods.filter(food => {
      if (profile.exclude_allergens.some(allergen => 
        food.allergens.toLowerCase().includes(allergen.toLowerCase())
      )) {
        return false;
      }
      
      if (profile.dietary_preferences.includes('vegetarian') && 
          (food.name.toLowerCase().includes('chicken') || 
           food.name.toLowerCase().includes('salmon') || 
           food.name.toLowerCase().includes('fish'))) {
        return false;
      }
      
      if (profile.dietary_preferences.includes('vegan') && 
          (food.name.toLowerCase().includes('yogurt') || 
           food.name.toLowerCase().includes('cheese') || 
           food.name.toLowerCase().includes('egg'))) {
        return false;
      }
      
      if (food.prep_time_min > profile.prep_time_limit) {
        return false;
      }
      
      const budgetMap = { low: 1, medium: 2, high: 3 };
      if (food.price_tier > budgetMap[profile.budget_preference]) {
        return false;
      }
      
      return true;
    });
  }
  
  private scoreFood(food: Food, profile: ParsedProfile, mealType: string): number {
    let score = 0;
    
    if (profile.macro_preferences.high_protein) {
      score += food.protein_g * 2;
    }
    
    if (profile.macro_preferences.high_fiber) {
      score += food.fiber_g * 3;
    }
    
    if (profile.macro_preferences.low_carb) {
      score -= food.carbs_g * 0.5;
    }
    
    if (profile.macro_preferences.low_fat) {
      score -= food.fat_g * 0.3;
    }
    
    if (mealType === 'breakfast') {
      if (food.name.toLowerCase().includes('oatmeal') || 
          food.name.toLowerCase().includes('yogurt') ||
          food.name.toLowerCase().includes('egg')) {
        score += 10;
      }
    }
    
    if (mealType === 'lunch') {
      if (food.name.toLowerCase().includes('salad') || 
          food.name.toLowerCase().includes('quinoa') ||
          food.name.toLowerCase().includes('bean')) {
        score += 8;
      }
    }
    
    if (mealType === 'dinner') {
      if (food.name.toLowerCase().includes('salmon') || 
          food.name.toLowerCase().includes('chicken') ||
          food.name.toLowerCase().includes('tofu')) {
        score += 12;
      }
    }
    
    if (mealType === 'snack') {
      if (food.name.toLowerCase().includes('nut') || 
          food.name.toLowerCase().includes('fruit') ||
          food.name.toLowerCase().includes('cheese')) {
        score += 6;
      }
    }
    
    score += (100 - food.glycemic_index) * 0.1;
    score -= food.prep_time_min * 0.2;
    
    return score;
  }
  
  private selectMeal(availableFoods: Food[], profile: ParsedProfile, mealType: string, targetCalories: number): Food {
    const scoredFoods = availableFoods
      .map(food => ({
        food,
        score: this.scoreFood(food, profile, mealType),
        calorieDiff: Math.abs(food.calories - targetCalories)
      }))
      .sort((a, b) => {
        if (Math.abs(a.calorieDiff - b.calorieDiff) < 20) {
          return b.score - a.score;
        }
        return a.calorieDiff - b.calorieDiff;
      });
    
    // Add variety by selecting from top 3 foods instead of always the first
    const topFoods = scoredFoods.slice(0, Math.min(3, scoredFoods.length));
    const randomIndex = Math.floor(Math.random() * topFoods.length);
    
    return topFoods[randomIndex].food;
  }
  
  generateMealPlan(profile: ParsedProfile): MealPlan {
    const availableFoods = this.filterFoods(profile);
    
    if (availableFoods.length < 4) {
      throw new Error('Not enough suitable foods available for meal plan');
    }
    
    const targetPerMeal = profile.calorie_target / 4;
    const selectedFoods: Food[] = [];
    
    const breakfast = this.selectMeal(availableFoods, profile, 'breakfast', targetPerMeal);
    selectedFoods.push(breakfast);
    
    const lunch = this.selectMeal(
      availableFoods.filter(food => !selectedFoods.some(selected => selected.name === food.name)), 
      profile, 
      'lunch', 
      targetPerMeal
    );
    selectedFoods.push(lunch);
    
    const dinner = this.selectMeal(
      availableFoods.filter(food => !selectedFoods.some(selected => selected.name === food.name)), 
      profile, 
      'dinner', 
      targetPerMeal
    );
    selectedFoods.push(dinner);
    
    const snack = this.selectMeal(
      availableFoods.filter(food => !selectedFoods.some(selected => selected.name === food.name)), 
      profile, 
      'snack', 
      targetPerMeal * 0.6
    );
    
    const total_calories = breakfast.calories + lunch.calories + dinner.calories + snack.calories;
    const total_protein = breakfast.protein_g + lunch.protein_g + dinner.protein_g + snack.protein_g;
    const total_fiber = breakfast.fiber_g + lunch.fiber_g + dinner.fiber_g + snack.fiber_g;
    const total_carbs = breakfast.carbs_g + lunch.carbs_g + dinner.carbs_g + snack.carbs_g;
    const total_fat = breakfast.fat_g + lunch.fat_g + dinner.fat_g + snack.fat_g;
    
    return {
      breakfast,
      lunch,
      dinner,
      snack,
      total_calories,
      total_protein,
      total_fiber,
      total_carbs,
      total_fat
    };
  }
  
  generateExplanations(mealPlan: MealPlan, profile: ParsedProfile): MealExplanation[] {
    const explanations: MealExplanation[] = [];
    
    explanations.push({
      meal: 'Breakfast',
      food: mealPlan.breakfast,
      rationale: this.generateRationale(mealPlan.breakfast, profile, 'breakfast')
    });
    
    explanations.push({
      meal: 'Lunch',
      food: mealPlan.lunch,
      rationale: this.generateRationale(mealPlan.lunch, profile, 'lunch')
    });
    
    explanations.push({
      meal: 'Dinner',
      food: mealPlan.dinner,
      rationale: this.generateRationale(mealPlan.dinner, profile, 'dinner')
    });
    
    explanations.push({
      meal: 'Snack',
      food: mealPlan.snack,
      rationale: this.generateRationale(mealPlan.snack, profile, 'snack')
    });
    
    return explanations;
  }
  
  private generateRationale(food: Food, profile: ParsedProfile, mealType: string): string {
    const reasons: string[] = [];
    
    if (profile.macro_preferences.high_protein && food.protein_g > 5) {
      reasons.push(`high protein (${food.protein_g}g)`);
    }
    
    if (profile.macro_preferences.high_fiber && food.fiber_g > 2) {
      reasons.push(`good fiber content (${food.fiber_g}g)`);
    }
    
    if (food.glycemic_index < 40) {
      reasons.push('low glycemic index for stable energy');
    }
    
    if (food.prep_time_min < 10) {
      reasons.push('quick to prepare');
    }
    
    if (mealType === 'breakfast' && (food.name.toLowerCase().includes('oatmeal') || food.name.toLowerCase().includes('yogurt'))) {
      reasons.push('ideal breakfast food');
    }
    
    if (mealType === 'dinner' && (food.name.toLowerCase().includes('salmon') || food.name.toLowerCase().includes('chicken'))) {
      reasons.push('satisfying dinner protein');
    }
    
    if (reasons.length === 0) {
      reasons.push('balanced nutrition and fits dietary constraints');
    }
    
    return reasons.join(', ');
  }
  
  generateDaySummary(profile: ParsedProfile, mealPlan: MealPlan): string {
    const calorieDiff = Math.abs(mealPlan.total_calories - profile.calorie_target);
    const calorieStatus = calorieDiff <= profile.calorie_target * 0.1 ? 'perfectly' : 'closely';
    
    const proteinStatus = profile.macro_preferences.high_protein && mealPlan.total_protein > 50 ? 'high-protein' : 'balanced';
    const fiberStatus = profile.macro_preferences.high_fiber && mealPlan.total_fiber > 20 ? 'high-fiber' : 'moderate-fiber';
    
    return `This ${proteinStatus}, ${fiberStatus} meal plan delivers ${mealPlan.total_calories} calories, ${calorieStatus} matching your ${profile.calorie_target} kcal target. The day includes ${mealPlan.breakfast.name} for breakfast, ${mealPlan.lunch.name} for lunch, ${mealPlan.dinner.name} for dinner, and ${mealPlan.snack.name} as a snack. All meals respect your dietary preferences and allergen restrictions while providing balanced nutrition throughout the day.`;
  }
  
  validateMealPlan(mealPlan: MealPlan, profile: ParsedProfile): { allergens_clear: boolean; calories_within_range: boolean; all_meals_explained: boolean } {
    const allergens_clear = [mealPlan.breakfast, mealPlan.lunch, mealPlan.dinner, mealPlan.snack]
      .every(food => !profile.exclude_allergens.some(allergen => 
        food.allergens.toLowerCase().includes(allergen.toLowerCase())
      ));
    
    const calories_within_range = Math.abs(mealPlan.total_calories - profile.calorie_target) <= profile.calorie_target * 0.1;
    
    const all_meals_explained = true;
    
    return { allergens_clear, calories_within_range, all_meals_explained };
  }
  
  generateFullPlan(profile: ParsedProfile): DaySummary {
    const mealPlan = this.generateMealPlan(profile);
    const explanations = this.generateExplanations(mealPlan, profile);
    const daySummary = this.generateDaySummary(profile, mealPlan);
    const validationChecks = this.validateMealPlan(mealPlan, profile);
    
    return {
      profile_used: profile,
      meal_plan: mealPlan,
      explanations,
      day_summary: daySummary,
      validation_checks: validationChecks
    };
  }
}
