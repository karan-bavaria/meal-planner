import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Shuffle } from 'lucide-react';

interface ProfileInputProps {
  profileText: string;
  onProfileTextChange: (text: string) => void;
  onGenerateMealPlan: () => void;
  loading: boolean;
  sampleProfiles: string[];
  selectedProfileIndex: number;
  onSelectedProfileIndexChange: (index: number) => void;
  hasMealPlan?: boolean;
}

export function ProfileInput({
  profileText,
  onProfileTextChange,
  onGenerateMealPlan,
  loading,
  sampleProfiles,
  selectedProfileIndex,
  onSelectedProfileIndexChange,
  hasMealPlan = false
}: ProfileInputProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Profile Input</CardTitle>
        <CardDescription>
          Describe your dietary preferences, restrictions, and goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={profileText}
          onChange={(e) => onProfileTextChange(e.target.value)}
          className="min-h-32 resize-none"
          placeholder="Enter your dietary profile..."
        />
        <div className="flex gap-2">
                      <Button
              onClick={onGenerateMealPlan}
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                hasMealPlan ? (
                  <>
                    <Shuffle className="mr-2 h-4 w-4" />
                    Regenerate Meal Plan
                  </>
                ) : (
                  'Generate Meal Plan'
                )
              )}
            </Button>
          <Select
            value={selectedProfileIndex.toString()}
            onValueChange={(value) => {
              const index = parseInt(value);
              onSelectedProfileIndexChange(index);
              onProfileTextChange(sampleProfiles[index]);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sample Profiles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sample Profile 1</SelectItem>
              <SelectItem value="1">Sample Profile 2</SelectItem>
              <SelectItem value="2">Sample Profile 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
