import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products, vendors } from '@/lib/data';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { placeholderImages } from '@/lib/placeholder-images';
import { Suspense } from 'react';

async function RecommendedProducts() {
  // Mock user data for recommendation generation
  const recommendationsInput = {
    userId: 'user-12345',
    browsingHistory: ['prod-001', 'prod-003', 'prod-005'],
    purchaseHistory: ['prod-002'],
  };

  try {
    const { recommendations } = await getPersonalizedRecommendations(recommendationsInput);
    
    const recommendedProducts = products.filter(p => recommendations.includes(p.id));
    const displayProducts = recommendedProducts.length > 0 ? recommendedProducts : products.slice(4, 8);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Fallback to showing some other products
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(8, 12).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

function HomeContents() {
  const heroImage = placeholderImages.find(p => p.id === "hero-main");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] text-white">
          {heroImage && 
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          }
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 shadow-lg">Welcome to Tradinta Marketplace</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 shadow-md">Discover unique products from vendors around the world and our own curated collection.</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/search">Start Shopping</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">Recommended For You</h2>
            <RecommendedProducts />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">Our Vendors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {vendors.map((vendor) => {
                const vendorLogo = placeholderImages.find(img => img.id === vendor.logoUrl.split('/').pop());
                return (
                  <Link href={`/store/${vendor.id}`} key={vendor.id} className="group">
                    <Card className="flex flex-col items-center p-6 text-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                      {vendorLogo && (
                        <Image
                          src={vendorLogo.imageUrl}
                          alt={`${vendor.name} logo`}
                          width={80}
                          height={80}
                          className="rounded-full mb-4"
                          data-ai-hint={vendorLogo.imageHint}
                        />
                      )}
                      <h3 className="text-lg font-bold font-headline">{vendor.name}</h3>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

// A simple card component for the vendors section
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`bg-card text-card-foreground rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContents />
    </Suspense>
  )
}
