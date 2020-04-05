import { model, Schema } from 'mongoose';
import ReviewInterface from '../types/review';

const ReviewSchema = new Schema(
  {
    comment: {
      type: String,
      minlength: 5,
      maxlength: 200,
      trim: true,
      lowercase: true,
      required: true
    },

    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },

    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }
  },

  { timestamps: true }
);

/**
 * Methods
 */
ReviewSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  }
};

export default model<ReviewInterface>('review', ReviewSchema);
