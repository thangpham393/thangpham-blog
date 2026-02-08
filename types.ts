
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  views: number;
  date: string;
  imageUrl: string;
  type: 'blog' | 'share-code' | 'video';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
}

export interface Course {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  isFree?: boolean;
}
