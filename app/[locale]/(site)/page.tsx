import { ThemeToggle } from '@/components/theme-toggle';

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Home</h1>
      <div className="mt-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
