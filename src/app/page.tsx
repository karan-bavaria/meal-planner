'use client';

import { useState, useEffect } from 'react';
import { Food, ParsedProfile, DaySummary } from '@/types';
import { MealPlanner } from '@/lib/mealPlanner';
import { parseProfile } from '@/lib/profileParser';
import { loadFoods, sampleProfiles } from '@/lib/dataLoader';
import { Header } from '@/components/layout/header';
import {
  ProfileInput,
  ParsedProfileDisplay,
  DaySummary as DaySummaryComponent,
  MealPlan,
  GroceryList,
  ValidationChecks,
} from '@/components/meal-planner';

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [profileText, setProfileText] = useState(sampleProfiles[0]);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [parsedProfile, setParsedProfile] = useState<ParsedProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<DaySummary | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFoods().then(setFoods);
  }, []);

  const generateMealPlan = async () => {
    if (!foods.length) return;

    setLoading(true);
    try {
      const profile = parseProfile(profileText);
      setParsedProfile(profile);

      const planner = new MealPlanner(foods);
      const plan = planner.generateFullPlan(profile);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Meal Planner</h1>
            <p className="text-muted-foreground">Transform your dietary preferences into personalized meal plans</p>
          </div>

          <ProfileInput
            profileText={profileText}
            onProfileTextChange={setProfileText}
            onGenerateMealPlan={generateMealPlan}
            loading={loading}
            sampleProfiles={sampleProfiles}
            selectedProfileIndex={selectedProfileIndex}
            onSelectedProfileIndexChange={setSelectedProfileIndex}
            hasMealPlan={!!mealPlan}
          />

          {mealPlan && (
            <>
              <DaySummaryComponent daySummary={mealPlan} />
              <MealPlan daySummary={mealPlan} />
              <GroceryList daySummary={mealPlan} />
              <ValidationChecks daySummary={mealPlan} />
            </>
          )}

          {parsedProfile && <ParsedProfileDisplay parsedProfile={parsedProfile} />}
        </div>
      </main>
    </div>
  );
}
