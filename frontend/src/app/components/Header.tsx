'use client'
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="bg-background text-foreground shadow-md">
      <div className="font-custom container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Mystery Musume
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={`${pathname === '/' ? "active-link" : ""}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/paintings" className={`${pathname === '/paintings' ? "active-link" : ""}`}>
                Paintings
              </Link>
            </li>
            <li>
              <Link href="/artifacts" className={`${pathname === '/artifacts' ? "active-link" : ""}`}>
                Artifacts
              </Link>
            </li>
            <li>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-accent"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
