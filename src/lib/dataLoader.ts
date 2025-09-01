import { Food } from '@/types';

export async function loadFoods(): Promise<Food[]> {
  try {
    const response = await fetch('/data/foods.csv');
    const csvText = await response.text();
    
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    const foods: Food[] = lines.slice(1).map(line => {
      const values = line.split(',');
      const food: Record<string, string | number> = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        
        if (header === 'calories' || header === 'protein_g' || header === 'fiber_g' || 
            header === 'carbs_g' || header === 'fat_g' || header === 'glycemic_index' || 
            header === 'price_tier' || header === 'prep_time_min') {
          food[header] = parseInt(value) || 0;
        } else {
          food[header] = value;
        }
      });
      
      return food as unknown as Food;
    });
    
    return foods;
  } catch (error) {
    console.error('Error loading foods:', error);
    return [];
  }
}

export const sampleProfiles = [
  "38f, vegetarian, avoid peanuts; weight loss ~1600 kcal; prefers higher protein & fiber.",
  "25m, keto diet, no dairy; muscle gain ~2200 kcal; high protein, low carb, budget conscious.",
  "45f, vegan, gluten-free, allergic to tree nuts; maintenance ~1800 kcal; quick prep meals only, premium budget."
];
