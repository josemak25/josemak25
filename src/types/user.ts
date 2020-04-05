import { Document } from 'mongoose';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'administrator'
}

export default interface UserInterface extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  password: string;
  DOB: Date | null;
  isVerified: boolean;
  gender: Gender;
  isBlocked: boolean;
  role: Role;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  password: string;
  DOB?: Date | null;
  isVerified?: boolean;
  gender?: Gender;
  isBlocked?: boolean;
  role?: Role;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserTokenType extends UserInterface {
  role: Role;
  sub: string;
  iat: number;
}

export type UserExitsType = { phone: string };

export type GetUserType = { _id: string };
