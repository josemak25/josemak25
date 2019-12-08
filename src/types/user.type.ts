import { Document } from "mongoose";

export default interface UserInterface extends Document {
  name: string;
  age: number;
  _id: string;
}
