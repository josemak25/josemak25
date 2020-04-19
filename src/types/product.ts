import { Document } from 'mongoose';
import ImageInterface from './images';

export default interface ProductInterface extends Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  images?: ImageInterface[];
  quantity: number;
  totalStock: number;
  isDeleted: boolean;
  brandId: string;
  categoryId: string;
  discountId: string;
  tagId: string;
  createAt: Date;
  updatedAt: Date;
}

export type ProductType = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  images?: ImageInterface[];
  quantity: number;
  totalStock: number;
  isDeleted?: boolean;
  brandId: string;
  categoryId: string;
  discountId: string;
  tagId: string;
  createAt?: Date;
  updatedAt?: Date;
};

export type ProductExitsType = { name: string };

export type ProductQueryType = { skip: number; limit?: number };
