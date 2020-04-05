import { Document } from 'mongoose';

export default interface ReviewInterface extends Document {
  _id: string;
  comment: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type ReviewType = {
  _id?: string;
  comment: string;
  productId: string;
  userId: string;
};

export type ProductReviewType = { productId: string };
