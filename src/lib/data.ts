import type { Vendor, Product } from './types';

export const vendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Tech Innovators Inc.',
    logoUrl: '/vendor-logo-1.png',
    logoHint: 'tech logo',
    coverImageUrl: '/vendor-cover-1.png',
    coverImageHint: 'tech gadgets',
    rating: 4.8,
    reviewCount: 1250,
    description: 'Your one-stop shop for the latest and greatest in tech. From headphones to smartwatches, we have it all.'
  },
  {
    id: 'vendor-2',
    name: 'Fashion Forward',
    logoUrl: '/vendor-logo-2.png',
    logoHint: 'fashion logo',
    coverImageUrl: '/vendor-cover-2.png',
    coverImageHint: 'fashion boutique',
    rating: 4.6,
    reviewCount: 3400,
    description: 'Stay ahead of the trend with our curated collection of modern apparel and accessories.'
  },
  {
    id: 'vendor-3',
    name: 'Cozy Home Creations',
    logoUrl: '/vendor-logo-3.png',
    logoHint: 'home logo',
    coverImageUrl: '/vendor-cover-3.png',
    coverImageHint: 'home interior',
    rating: 4.9,
    reviewCount: 890,
    description: 'Beautifully crafted goods to make your house a home. Unique decor, kitchenware, and more.'
  },
  {
    id: 'warehouse',
    name: 'GlobalHub Warehouse',
    logoUrl: '/vendor-logo-4.png',
    logoHint: 'warehouse logo',
    coverImageUrl: '/vendor-cover-4.png',
    coverImageHint: 'warehouse interior',
    rating: 5.0,
    reviewCount: 15000,
    description: 'Directly from our central warehouse. Quality products with fast shipping.'
  }
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Noise-Cancelling Headphones',
    vendorId: 'vendor-1',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 890,
    imageUrl: 'prod-img-1',
    imageHint: 'wireless headphones',
    description: 'Immerse yourself in sound with these premium wireless headphones. Featuring active noise cancellation and 20-hour battery life.',
    variations: { Color: ['Black', 'White', 'Blue'] }
  },
  {
    id: 'prod-002',
    name: 'Leather Travel Backpack',
    vendorId: 'vendor-2',
    price: 120.00,
    category: 'Fashion',
    rating: 4.9,
    reviewCount: 450,
    imageUrl: 'prod-img-2',
    imageHint: 'leather backpack',
    description: 'Travel in style with this genuine leather backpack. Multiple compartments and a padded laptop sleeve make it perfect for work or leisure.'
  },
  {
    id: 'prod-003',
    name: 'Elegant Smartwatch Series 7',
    vendorId: 'vendor-1',
    price: 399.00,
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1200,
    imageUrl: 'prod-img-3',
    imageHint: 'smartwatch silver',
    description: 'Stay connected and track your fitness with this state-of-the-art smartwatch. Features a vibrant always-on display.',
    variations: { Size: ['41mm', '45mm'], Color: ['Silver', 'Graphite'] }
  },
  {
    id: 'prod-004',
    name: 'Pro-Comfort Running Shoes',
    vendorId: 'warehouse',
    price: 89.95,
    category: 'Fashion',
    rating: 4.5,
    reviewCount: 2300,
    imageUrl: 'prod-img-4',
    imageHint: 'running shoes',
    description: 'Experience ultimate comfort on your runs with our Pro-Comfort shoes. Lightweight, breathable, and designed for performance.'
  },
  {
    id: 'prod-005',
    name: '4K Digital Mirrorless Camera',
    vendorId: 'vendor-1',
    price: 1299.00,
    originalPrice: 1499.00,
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 310,
    imageUrl: 'prod-img-5',
    imageHint: 'digital camera',
    description: 'Capture life\'s moments in stunning 4K. This mirrorless camera offers professional features in a compact body.'
  },
  {
    id: 'prod-006',
    name: 'Minimalist Ceramic Mug Set',
    vendorId: 'vendor-3',
    price: 45.50,
    category: 'Home Goods',
    rating: 4.8,
    reviewCount: 150,
    imageUrl: 'prod-img-6',
    imageHint: 'ceramic mugs',
    description: 'A set of four beautifully designed ceramic mugs. Perfect for your morning coffee or evening tea.'
  },
  {
    id: 'prod-007',
    name: 'Classic Denim Jacket',
    vendorId: 'vendor-2',
    price: 75.00,
    category: 'Fashion',
    rating: 4.6,
    reviewCount: 780,
    imageUrl: 'prod-img-7',
    imageHint: 'denim jacket',
    description: 'A timeless denim jacket that never goes out of style. Made from 100% premium cotton.',
    variations: { Size: ['S', 'M', 'L', 'XL'] }
  },
  {
    id: 'prod-008',
    name: 'Organic Cotton Crewneck T-Shirt',
    vendorId: 'warehouse',
    price: 25.00,
    category: 'Fashion',
    rating: 4.9,
    reviewCount: 5000,
    imageUrl: 'prod-img-8',
    imageHint: 'white t-shirt',
    description: 'The perfect t-shirt. Made from ultra-soft 100% organic cotton. A wardrobe essential.',
    variations: { Color: ['White', 'Black', 'Heather Grey'] }
  },
  {
    id: 'prod-009',
    name: 'Sleek 10,000mAh Power Bank',
    vendorId: 'warehouse',
    price: 35.99,
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 1800,
    imageUrl: 'prod-img-9',
    imageHint: 'power bank',
    description: 'Charge your devices on the go with this slim and powerful 10,000mAh power bank. Features USB-C and USB-A ports.'
  },
  {
    id: 'prod-010',
    name: 'Handcrafted Wooden Chess Set',
    vendorId: 'vendor-3',
    price: 95.00,
    category: 'Home Goods',
    rating: 4.9,
    reviewCount: 210,
    imageUrl: 'prod-img-10',
    imageHint: 'chess set',
    description: 'A beautiful, handcrafted wooden chess set that doubles as a piece of art. Perfect for players and collectors.'
  },
  {
    id: 'prod-011',
    name: 'Vintage-Style Bluetooth Turntable',
    vendorId: 'vendor-1',
    price: 199.50,
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 420,
    imageUrl: 'prod-img-11',
    imageHint: 'vinyl turntable',
    description: 'Rediscover the warmth of vinyl with this vintage-style turntable. Features Bluetooth connectivity to stream to your wireless speakers.'
  },
  {
    id: 'prod-012',
    name: 'Professional 8-Piece Knife Set',
    vendorId: 'warehouse',
    price: 159.99,
    originalPrice: 199.99,
    category: 'Home Goods',
    rating: 4.8,
    reviewCount: 950,
    imageUrl: 'prod-img-12',
    imageHint: 'kitchen knives',
    description: 'Upgrade your kitchen with this professional-grade knife set. Includes a chef\'s knife, bread knife, and more, all housed in a stylish wooden block.'
  }
];
