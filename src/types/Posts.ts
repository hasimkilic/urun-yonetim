export interface Post {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  rating: {
    rate: string;
    count: number;
  };
  image: string;
}
