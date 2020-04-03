import { Model } from "mongoose";

export default class Queries {
  private Model: Model<any>;

  constructor(model: Model<any>) {
    this.Model = model;
  }

  create<T, U>(payload: T): Promise<U> {
    return this.Model.create(payload);
  }

  findOne<T, U>(payload: T): Promise<U> {
    return this.Model.findOne(payload).exec();
  }

  findAll<T, U>(payload: T): Promise<U[]> {
    return this.Model.find(payload).exec();
  }

  update<T>({ payload, where }: any): Promise<T> {
    return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
  }

  delete<T, U>(payload: T): Promise<U> {
    return this.Model.findOneAndDelete(payload).exec();
  }
}
