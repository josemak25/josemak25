export default class Queries {
  Model: any;

  constructor(Model: any) {
    this.Model = Model;
  }

  create(payload: object) {
    return this.Model.create(payload);
  }

  getOne(payload: object) {
    return this.Model.findOne(payload).exec();
  }

  getAll(payload: object) {
    return this.Model.find(payload);
  }

  update({ payload, where }: any) {
    return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
  }

  delete(payload: object) {
    return this.Model.findOneAndDelete(payload).exec();
  }
}
