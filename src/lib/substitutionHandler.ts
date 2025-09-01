import { MealPlanner } from './mealPlanner';
import { DaySummary } from '@/types';

export class SubstitutionHandler {
  private mealPlanner: MealPlanner;
  
  constructor(mealPlanner: MealPlanner) {
    this.mealPlanner = mealPlanner;
  }
  
  handleSubstitution(originalPlan: DaySummary, substitutionRequest: string): DaySummary {
    const request = substitutionRequest.toLowerCase();
    
    if (request.includes('lower carb') || request.includes('low carb')) {
      return this.handleLowCarbSubstitution(originalPlan);
    }
    
    if (request.includes('higher protein') || request.includes('high protein')) {
      return this.handleHighProteinSubstitution(originalPlan);
    }
    
    if (request.includes('vegetarian') || request.includes('veggie')) {
      return this.handleVegetarianSubstitution(originalPlan);
    }
    
    if (request.includes('quick') || request.includes('fast')) {
      return this.handleQuickPrepSubstitution(originalPlan);
    }
    
    if (request.includes('cheap') || request.includes('budget')) {
      return this.handleBudgetSubstitution(originalPlan);
    }
    
    return originalPlan;
  }
  
  private handleLowCarbSubstitution(originalPlan: DaySummary): DaySummary {
    const modifiedProfile = {
      ...originalPlan.profile_used,
      macro_preferences: {
        ...originalPlan.profile_used.macro_preferences,
        low_carb: true
      }
    };
    
    return this.mealPlanner.generateFullPlan(modifiedProfile);
  }
  
  private handleHighProteinSubstitution(originalPlan: DaySummary): DaySummary {
    const modifiedProfile = {
      ...originalPlan.profile_used,
      macro_preferences: {
        ...originalPlan.profile_used.macro_preferences,
        high_protein: true
      }
    };
    
    return this.mealPlanner.generateFullPlan(modifiedProfile);
  }
  
  private handleVegetarianSubstitution(originalPlan: DaySummary): DaySummary {
    const modifiedProfile = {
      ...originalPlan.profile_used,
      dietary_preferences: [...originalPlan.profile_used.dietary_preferences, 'vegetarian']
    };
    
    return this.mealPlanner.generateFullPlan(modifiedProfile);
  }
  
  private handleQuickPrepSubstitution(originalPlan: DaySummary): DaySummary {
    const modifiedProfile = {
      ...originalPlan.profile_used,
      prep_time_limit: 15
    };
    
    return this.mealPlanner.generateFullPlan(modifiedProfile);
  }
  
  private handleBudgetSubstitution(originalPlan: DaySummary): DaySummary {
    const modifiedProfile = {
      ...originalPlan.profile_used,
      budget_preference: 'low' as const
    };
    
    return this.mealPlanner.generateFullPlan(modifiedProfile);
  }
}
