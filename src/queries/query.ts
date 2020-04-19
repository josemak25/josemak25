import { Model } from 'mongoose';
import { QueryOptions } from './types';

export default class Queries {
  private Model: Model<any>;

  constructor(model: Model<any>) {
    this.Model = model;
  }

  create<T, U>(payload: T): Promise<U> {
    return this.Model.create(payload);
  }

  insertMany<T, U>(payload: T[]): Promise<U[]> {
    return this.Model.insertMany(payload);
  }

  findOne<T, U>(payload: T): Promise<U> {
    return this.Model.findOne(payload).exec();
  }

  findAll<T, U>(payload: T, options: QueryOptions): Promise<U[]> {
    return this.Model.find(payload)
      .skip(+options.skip)
      .limit(+options.limit ? +options.limit : 30)
      .sort(options.sort ? options.sort : 'createdAt')
      .exec();
  }

  update<T>({ payload, where }: any): Promise<T> {
    return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
  }

  delete<T, U>(payload: T): Promise<U> {
    return this.Model.findOneAndDelete(payload).exec();
  }
}
