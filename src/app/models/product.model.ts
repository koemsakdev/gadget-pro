export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount: number;
  metrics: {
    sold: number;
    views: number;
    rating: number;
    reviewCount: number;
  };
  tags: string[];
}
