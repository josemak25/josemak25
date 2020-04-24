import { Document } from 'mongoose';

export default interface CategoryInterface extends Document {
  _id: string;
  name: string;
  isDeleted: string;
  createdAt: string;
  updatedAt: string;
}

export type CategoryType = {
  _id?: string;
  name: string;
  isDeleted: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductCategoryType = { categoryId: string };
