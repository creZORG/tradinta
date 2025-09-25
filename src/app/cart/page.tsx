'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <ShoppingCart className="h-8 w-8" />
          <h1 className="text-3xl font-headline font-bold">Your Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <Card className="text-center py-20">
            <CardContent>
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <Button asChild>
                <Link href="/search">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {cart.map(({ product, quantity }) => {
                      const productImage = placeholderImages.find(p => p.id === product.imageUrl);
                      return (
                        <div key={product.id} className="flex flex-col sm:flex-row gap-4 p-6">
                          {productImage && (
                            <div className="w-full sm:w-24 h-24 shrink-0 relative rounded-md overflow-hidden">
                              <Image
                                src={productImage.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                data-ai-hint={productImage.imageHint}
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <Link href={`/products/${product.id}`} className="font-bold hover:text-primary">{product.name}</Link>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(product.id)}>
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
