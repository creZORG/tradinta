'use client';

import { Suspense } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductCard } from '@/components/ProductCard';
import { products, vendors } from '@/lib/data';
import { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState, useEffect, useMemo } from 'react';
import { BrainCircuit } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('relevance');

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], []);

  useEffect(() => {
    let results = query
      ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
      : [...products];

    if (selectedCategories.length > 0) {
      results = results.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedVendors.length > 0) {
      results = results.filter(p => selectedVendors.includes(p.vendorId));
    }
    results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch(sortBy) {
        case 'price-asc':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
    }

    setFilteredProducts(results);
  }, [query, selectedCategories, selectedVendors, priceRange, sortBy]);
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => checked ? [...prev, category] : prev.filter(c => c !== category));
  };
  
  const handleVendorChange = (vendorId: string, checked: boolean) => {
    setSelectedVendors(prev => checked ? [...prev, vendorId] : prev.filter(v => v !== vendorId));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={`cat-${category}`} onCheckedChange={(checked) => handleCategoryChange(category, !!checked)} />
                        <Label htmlFor={`cat-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Vendor</h3>
                  <div className="space-y-2">
                    {vendors.map(vendor => (
                       <div key={vendor.id} className="flex items-center space-x-2">
                        <Checkbox id={`ven-${vendor.id}`} onCheckedChange={(checked) => handleVendorChange(vendor.id, !!checked)} />
                        <Label htmlFor={`ven-${vendor.id}`}>{vendor.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <Slider
                    defaultValue={[0, 2000]}
                    min={0}
                    max={2000}
                    step={50}
                    onValueCommit={(value) => setPriceRange(value as [number, number])}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
          <div className="lg:col-span-3">
             <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Search Results</h1>
                    {query && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground p-2 bg-secondary rounded-md">
                            <BrainCircuit className="h-4 w-4 text-primary shrink-0"/>
                            <span>Showing results for improved query: <strong className="text-foreground">{query}</strong></span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Label htmlFor="sort-by">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by" className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Top Rated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
             </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center py-16 text-muted-foreground">No products found for your search.</p>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
