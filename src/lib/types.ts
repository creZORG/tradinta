export interface Product {
  id: string;
  name: string;
  vendorId: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageHint: string;
  description: string;
  variations?: {
    [key: string]: string[];
  };
}

export interface Vendor {
  id: string;
  name: string;
  logoUrl: string;
  logoHint: string;
  coverImageUrl: string;
  coverImageHint: string;
  rating: number;
  reviewCount: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
