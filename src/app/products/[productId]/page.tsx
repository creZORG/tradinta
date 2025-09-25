'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products, vendors } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage({ params }: { params: { productId: string } }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }
  
  const vendor = vendors.find((v) => v.id === product.vendorId);
  const productImage = placeholderImages.find(p => p.id === product.imageUrl);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    // Check if all variations are selected
    if (product.variations && Object.keys(product.variations).length !== Object.keys(selectedVariations).length) {
      toast({
        variant: 'destructive',
        title: 'Please select options',
        description: 'You must select all available options before adding to cart.',
      });
      return;
    }
    
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleVariationChange = (variationName: string, value: string) => {
    setSelectedVariations(prev => ({ ...prev, [variationName]: value }));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={productImage.imageHint}
                priority
              />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.name}</h1>
            {vendor && (
                <Link href={`/store/${vendor.id}`} className="text-lg text-muted-foreground hover:text-primary mt-1">
                    Sold by {vendor.name}
                </Link>
            )}
            <div className="flex items-center gap-2 text-muted-foreground my-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-foreground">{product.rating}</span>
              </div>
              <span>({product.reviewCount} reviews)</span>
            </div>
            
            <p className="text-lg my-4">{product.description}</p>
            
            <div className="text-3xl font-bold my-4">
              ${product.price.toFixed(2)}
              {product.originalPrice && (
                <span className="ml-4 text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.variations && (
              <div className="space-y-4 my-4">
                {Object.entries(product.variations).map(([name, options]) => (
                  <div key={name} className="flex items-center gap-4">
                    <span className="font-medium w-20">{name}:</span>
                    <Select onValueChange={(value) => handleVariationChange(name, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={`Select ${name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map(option => (
                           <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-4 my-6">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-grow bg-accent hover:bg-accent/90 text-accent-foreground">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-2xl font-headline font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
