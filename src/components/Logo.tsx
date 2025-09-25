import Link from 'next/link';
import { Globe } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold font-headline ${className}`}>
      <div className="p-1.5 bg-primary text-primary-foreground rounded-lg">
        <Globe className="h-6 w-6" />
      </div>
      <span>GlobalHub</span>
    </Link>
  );
}
