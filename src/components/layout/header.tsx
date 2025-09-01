import { Card } from '@/components/ui/card';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <Card className="border-0 shadow-none bg-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Digbi Health</h1>
            </div>
          </div>
        </Card>
      </div>
    </header>
  );
}
