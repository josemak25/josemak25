export interface QueryOptions {
  skip: number;
  limit: number;
  sort?: string;
}

interface QueryBuilderInterface {
  create<T, U>(payload: T): Promise<U>;

  insertMany<T, U>(payload: T[]): Promise<U[]>;

  findOne<T, U>(payload: T): Promise<U>;

  findAll<T, U>(payload: T, options?: QueryOptions): Promise<U[]>;

  update<T>({ payload, where }: any): Promise<T>;

  delete<T, U>(payload: T): Promise<U>;
}

export default interface QueryInterface {
  UserQuery: QueryBuilderInterface;
  ProductQuery: QueryBuilderInterface;
  ReviewQuery: QueryBuilderInterface;
  ImageQuery: QueryBuilderInterface;
}
