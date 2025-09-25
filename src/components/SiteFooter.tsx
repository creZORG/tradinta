import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">Your Kenyan marketplace for unique and quality products.</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary" /></Link>
              <Link href="#" aria-label="Github"><Github className="h-5 w-5 hover:text-primary" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Best Sellers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">On Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Vendor Dashboard</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Documentation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-2">Subscribe to our newsletter for updates and promotions.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-background" />
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tradinta Marketplace. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
