import { Document } from 'mongoose';

export default interface ImageInterface extends Document {
  _id: string;
  url: string;
  thumbnailUrl: string;
  referenceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ImageType = {
  _id?: string;
  url?: string;
  thumbnailUrl?: string;
  referenceId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FormImageType = {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: object;
  size: number;
  name: string;
  type: string;
  id: string;
  folderId: string;
};

export type ImageUploadType = {
  type: string;
  path: string;
  name: string;
  folderId: string;
};

export type GetProductImageType = { referenceId: string };
