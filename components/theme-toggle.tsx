'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => setTheme('light')} className="px-3 py-1 rounded border">
        Light
      </button>
      <button type="button" onClick={() => setTheme('dark')} className="px-3 py-1 rounded border">
        Dark
      </button>
      <button type="button" onClick={() => setTheme('system')} className="px-3 py-1 rounded border">
        System
      </button>
    </div>
  );
}
