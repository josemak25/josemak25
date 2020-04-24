import { model, Schema } from 'mongoose';
import ReviewInterface from '../types/review';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 200,
      trim: true,
      lowercase: true,
      required: true
    },

    parents: [{ type: Schema.Types.ObjectId, default: null }],

    isDeleted: { type: Boolean, default: false }
  },

  { timestamps: true }
);

/**
 * Methods
 */
CategorySchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  }
};

export default model<ReviewInterface>('category', CategorySchema);
