export type { ProductOptionGroup } from "./whatsapp";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  options: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};
