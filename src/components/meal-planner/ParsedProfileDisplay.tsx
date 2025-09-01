import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ParsedProfile } from '@/types';

interface ParsedProfileDisplayProps {
  parsedProfile: ParsedProfile;
}

export function ParsedProfileDisplay({ parsedProfile }: ParsedProfileDisplayProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Parsed Profile</CardTitle>
        <CardDescription>
          Your dietary preferences converted to structured data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
          {JSON.stringify(parsedProfile, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
