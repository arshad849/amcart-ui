export interface Product {
    productId: string;             // Unique identifier
    name: string;           // Product name
    description: string;    // Product description
    price: number;          // Product price
    category: string;       // Product category
    images: string[];       // Product image URL
    stock: number;          // Available stock
    rating?: number;        // Optional: Customer rating
    clour: string;
    size: string[];
    attributes: { [key: string]: string };
    label?: string;
  }
  