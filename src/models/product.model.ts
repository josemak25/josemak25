import { model, Schema } from 'mongoose';
import ProductInterface from '../types/product';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 200,
      trim: true,
      lowercase: true,
      required: true,
      index: true
    },

    description: {
      type: String,
      minlength: 10,
      maxlength: 500,
      trim: true,
      lowercase: true,
      required: true
    },

    price: { type: Number, required: true, min: 0, default: 0 },

    quantity: { type: Number, required: true, min: 0, default: 0 },

    totalStock: { type: Number, required: true, min: 0, default: 0 },

    isDeleted: { type: Boolean, default: false },

    rating: { type: Number, min: 0, default: 0 },

    brandId: { type: Schema.Types.ObjectId, ref: 'brand', required: true },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true
    },

    discountId: {
      type: Schema.Types.ObjectId,
      ref: 'discount',
      required: true
    },

    tagId: { type: Schema.Types.ObjectId, ref: 'tags', required: true }
  },

  { timestamps: true }
);

/**
 * Methods
 */
ProductSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  }
};

export default model<ProductInterface>('product', ProductSchema);
