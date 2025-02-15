export interface UserType {
  name: string;
  email: string;
  photo?: string;
  isAdmin: boolean;
}

export interface BookType {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  coverImage: string;
  stock: number;
  createdAt?: string;
}
