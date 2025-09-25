import Image from 'next/image';
import { notFound } from 'next/navigation';
import { vendors, products } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductCard } from '@/components/ProductCard';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Suspense } from 'react';

function StorePageContents({ params }: { params: { storeId: string } }) {
  const vendor = vendors.find((v) => v.id === params.storeId);

  if (!vendor) {
    notFound();
  }

  const vendorProducts = products.filter((p) => p.vendorId === vendor.id);
  const vendorCoverImage = placeholderImages.find(p => p.id === vendor.coverImageUrl.split('/').pop());
  const vendorLogo = placeholderImages.find(p => p.id === vendor.logoUrl.split('/').pop());

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <div className="relative h-64 w-full">
          {vendorCoverImage && (
            <Image
              src={vendorCoverImage.imageUrl}
              alt={`${vendor.name} cover image`}
              fill
              className="object-cover"
              data-ai-hint={vendorCoverImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 -mt-20">
          <Card className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card/80 backdrop-blur-sm">
            {vendorLogo && (
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-card shrink-0">
                <Image
                  src={vendorLogo.imageUrl}
                  alt={`${vendor.name} logo`}
                  fill
                  className="object-cover"
                  data-ai-hint={vendorLogo.imageHint}
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-headline font-bold">{vendor.name}</h1>
              <p className="text-muted-foreground mt-2">{vendor.description}</p>
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-foreground">{vendor.rating}</span>
                </div>
                <span>({vendor.reviewCount} reviews)</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-headline font-bold mb-8">Products from {vendor.name}</h2>
            {vendorProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {vendorProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-16">This vendor has not added any products yet.</p>
            )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


export default function StorePage({ params }: { params: { storeId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StorePageContents params={params} />
    </Suspense>
  )
}
