"use client";

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SheetMenu } from '@/components/custom/sheet-menu';

import { UserNav } from './user-nav';

// interface NavbarProps {
//   // title: string;
// }

export function Navbar() {
  const pathname = usePathname();

  // Convert path to breadcrumbs
  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Special case for portal
      if (segment === "portal") {
        label = "Portal";
      }

      return {
        label,
        path,
        isLast: index === array.length - 1,
      };
    });

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {breadcrumbs.map(({ label, path, isLast }) => (
              <div key={path} className="flex items-center">
                {isLast ? (
                  <span className="text-muted-foreground">{label}</span>
                ) : (
                  <>
                    <Link
                      href={path}
                      className="hover:text-foreground text-muted-foreground transition-colors"
                    >
                      {label}
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
