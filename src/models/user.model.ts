import mongoose from "mongoose";
import UserInterface from "../types/user.type";

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

export default mongoose.model<UserInterface>("users", userSchema);
