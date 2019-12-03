export default interface QueryInterface {
  create: Function;
  getOne: Function;
  getAll: Function;
  update: Function;
  delete: Function;
  instanceModel?: object;
}
