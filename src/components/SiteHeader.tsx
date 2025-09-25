'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import React from 'react';
import { aiSearchImprovement } from '@/ai/flows/ai-search-improvement';

function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart />
        <span className="sr-only">Shopping Cart</span>
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('q') || '');
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const { improvedQuery } = await aiSearchImprovement({ query });
      router.push(`/search?q=${encodeURIComponent(improvedQuery)}`);
    } catch (error) {
      console.error('AI search improvement failed, falling back to original query', error);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        type="search"
        placeholder="Search products..."
        className="pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isSearching}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
        disabled={isSearching}
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}

const navLinks = [
  { href: '/search', label: 'All Products' },
  { href: '/dashboard', label: 'Vendor Dashboard' },
  { href: '/admin', label: 'Admin' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-4">
                <SheetClose asChild>
                    <Logo />
                </SheetClose>
                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link href={link.href} className="text-lg font-medium hover:text-primary">
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             <div className="hidden md:flex flex-1 items-center space-x-4">
               <nav className="flex items-center space-x-6 text-sm font-medium">
                  {navLinks.map((link) => (
                    <Link href={link.href} key={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <CartButton />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <User />
                <span className="sr-only">User Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
       <div className="sm:hidden border-t p-2">
          <SearchBar />
        </div>
    </header>
  );
}
