export type { ProductOptionGroup } from "./whatsapp";

export type CategoryDTO = {
  id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string | null;
  pieces: number | null;
  ingredients: string | null;
  wholesalePrice: number | null;
  discount: number;
  image: string;
  category: string;
  options: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};
