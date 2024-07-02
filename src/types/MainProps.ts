import { Post } from "./Posts";

export interface MainProps {
  posts: Post[];
  categories: string[];
  loading: boolean;
}
