'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/site';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-stone/80 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight font-semibold text-wood-900 hover:opacity-80 transition-opacity">
          Woodflex Designs
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className="text-sm font-medium text-wood-900/80 hover:text-wood-900 transition-colors uppercase tracking-wide aria-[current=page]:text-wood-900 aria-[current=page]:underline underline-offset-8"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((o) => !o)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 text-wood-900 hover:bg-wood-200 rounded-md transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-nav" className="md:hidden absolute top-20 left-0 w-full bg-wood-50 border-b border-wood-200 shadow-lg">
          <nav aria-label="Mobile" className="flex flex-col p-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-wood-900 hover:text-wood-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
