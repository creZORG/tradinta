'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { placeholderImages } from '@/lib/placeholder-images.json';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const productImage = placeholderImages.find(p => p.id === product.imageUrl);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square relative">
            {productImage && 
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={productImage.imageHint}
              />
            }
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg leading-tight mb-2">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <span className="mx-2">|</span>
          <span>{product.reviewCount} reviews</span>
        </div>
        <div className="text-xl font-bold">
          Kes {product.price.toFixed(2)}
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              Kes {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
