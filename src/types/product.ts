import { Document } from 'mongoose';

export default interface ProductInterface extends Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  totalStock: number;
  isDeleted: boolean;
  brandId: string;
  categoryId: string;
  discountId: string;
  tagId: string;
}

export type ProductType = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  totalStock: number;
  isDeleted?: boolean;
  brandId: string;
  categoryId: string;
  discountId: string;
  tagId: string;
};

export type ProductExitsType = { name: string };
