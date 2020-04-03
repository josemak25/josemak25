import { Document } from 'mongoose';

export enum Gender {
  male = 'male',
  female = 'female'
}

export enum Role {
  customer = 'customer',
  admin = 'administrator'
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
};

export type UserTokenType = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  DOB: Date | null;
  gender: Gender;
  isVerified: boolean;
  isBlocked: boolean;
  role: Role;
  sub: string;
  iat: number;
};

export type UserExitsType = { phone: string };

export type GetUserType = { _id: string };
