import { ParsedProfile } from '@/types';

export function parseProfile(profileText: string): ParsedProfile {
  const text = profileText.toLowerCase();
  
  const calorieMatch = text.match(/(\d+)\s*kcal/);
  const calorieTarget = calorieMatch ? parseInt(calorieMatch[1]) : 1600;
  
  const excludeAllergens: string[] = [];
  if (text.includes('peanut') || text.includes('peanuts')) excludeAllergens.push('peanuts');
  if (text.includes('tree nut') || text.includes('tree_nuts')) excludeAllergens.push('tree_nuts');
  if (text.includes('dairy') || text.includes('milk')) excludeAllergens.push('dairy');
  if (text.includes('gluten') || text.includes('wheat')) excludeAllergens.push('wheat');
  if (text.includes('soy')) excludeAllergens.push('soy');
  if (text.includes('egg') || text.includes('eggs')) excludeAllergens.push('eggs');
  if (text.includes('fish') || text.includes('seafood')) excludeAllergens.push('fish');
  
  const dietaryPreferences: string[] = [];
  if (text.includes('vegetarian') || text.includes('veggie')) dietaryPreferences.push('vegetarian');
  if (text.includes('vegan')) dietaryPreferences.push('vegan');
  if (text.includes('keto')) dietaryPreferences.push('keto');
  if (text.includes('paleo')) dietaryPreferences.push('paleo');
  
  const macroPreferences = {
    high_protein: text.includes('high protein') || text.includes('higher protein'),
    high_fiber: text.includes('high fiber') || text.includes('higher fiber'),
    low_carb: text.includes('low carb') || text.includes('lower carb'),
    low_fat: text.includes('low fat') || text.includes('lower fat')
  };
  
  let budgetPreference: 'low' | 'medium' | 'high' = 'medium';
  if (text.includes('budget') || text.includes('cheap')) budgetPreference = 'low';
  if (text.includes('premium') || text.includes('expensive')) budgetPreference = 'high';
  
  let prepTimeLimit = 30;
  if (text.includes('quick') || text.includes('fast')) prepTimeLimit = 15;
  if (text.includes('elaborate') || text.includes('complex')) prepTimeLimit = 60;
  
  return {
    calorie_target: calorieTarget,
    exclude_allergens: excludeAllergens,
    dietary_preferences: dietaryPreferences,
    macro_preferences: macroPreferences,
    budget_preference: budgetPreference,
    prep_time_limit: prepTimeLimit
  };
}
