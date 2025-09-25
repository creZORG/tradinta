'use client';

import { useCart } from '@/context/CartContext';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Truck, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment and create an order
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/');
  }

  if (cart.length === 0) {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-grow container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-6">You can't proceed to checkout without any items.</p>
                <Button onClick={() => router.push('/search')}>Start Shopping</Button>
            </main>
            <SiteFooter />
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-headline font-bold text-center mb-8">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Truck className="h-6 w-6"/>
                <CardTitle className="font-headline">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" required />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="CA" required />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="12345" required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Kenya" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CreditCard className="h-6 w-6" />
                <CardTitle className="font-headline">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="**** **** **** 1234" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM / YY" required />
                    </div>
                    <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map(({product, quantity}) => {
                    const productImage = placeholderImages.find(p => p.id === product.imageUrl);
                    return (
                        <div key={product.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                {productImage && <Image src={productImage.imageUrl} alt={product.name} fill className="object-cover" />}
                                <div className="absolute top-[-5px] right-[-5px] h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">{quantity}</div>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{product.name}</p>
                            </div>
                            <p className="font-semibold text-sm">Kes {(product.price * quantity).toFixed(2)}</p>
                        </div>
                    )
                  })}
                </div>
                <Separator className="my-4"/>
                <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>Kes {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>Kes 500.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Taxes</span>
                        <span>Kes {(cartTotal * 0.16).toFixed(2)}</span>
                    </div>
                    <Separator/>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Kes {(cartTotal + 500 + cartTotal * 0.16).toFixed(2)}</span>
                    </div>
                </div>
                <Button type="submit" size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">Place Order</Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
