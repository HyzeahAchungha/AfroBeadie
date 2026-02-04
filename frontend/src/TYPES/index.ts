interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  featured?: boolean;
  rating?: number;
  reviews?: number;
}

interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

