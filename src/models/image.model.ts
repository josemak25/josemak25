import { model, Schema } from 'mongoose';
import ImageInterface from '../types/images';

const ImageSchema = new Schema({
  url: { type: String, minlength: 5, maxlength: 150, required: true },

  thumbnailUrl: { type: String, minlength: 5, maxlength: 150, required: true },

  referenceId: { type: Schema.Types.ObjectId, required: true },

  createdAt: { type: Date, required: true },

  updatedAt: { type: Date, required: true }
});

/**
 * Methods
 */
ImageSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  }
};

export default model<ImageInterface>('images', ImageSchema);
