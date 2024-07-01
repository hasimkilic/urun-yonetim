import { Post } from "@/types/Posts";
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data: Post[] = await response.json();
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data: string[] = await response.json();
  return data;
};
export type { Post };

