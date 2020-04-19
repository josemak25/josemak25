import { model, Schema } from 'mongoose';
import UserInterface, { Gender, Role } from '../types/user';
import bcryptService from '../services/bcrypt.service';

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 250,
      trim: true,
      lowercase: true,
      required: true
    },

    lastName: {
      type: String,
      minlength: 2,
      maxlength: 250,
      trim: true,
      lowercase: true,
      required: true
    },

    phone: {
      type: String,
      validate: {
        validator: (phone: string) => /^(\+234|0)\d{10}$/.test(phone),
        message: '{VALUE} Phone number must be a valid number!'
      },
      minlength: 11,
      maxlength: 11,
      trim: true,
      required: true,
      index: true
    },

    password: {
      type: String,
      minlength: 6,
      maxlength: 30,
      trim: true,
      required: true
    },

    email: { type: String, default: null },

    DOB: { type: Date, default: null },

    isVerified: { type: Boolean, default: false },

    isBlocked: { type: Boolean, default: false },

    avatar: { type: String, required: true },

    avatarThumbnail: { type: String, required: true },

    gender: {
      type: String,
      required: true,
      enum: [Gender.MALE, Gender.FEMALE],
      default: Gender.MALE
    },

    role: {
      type: String,
      enum: [Role.CUSTOMER, Role.ADMIN],
      default: Role.CUSTOMER
    }
  },

  { timestamps: true }
);

/**
 * pre-save hooks
 */
UserSchema.pre<UserInterface>('save', async function(next) {
  try {
    this.password = await bcryptService.hashPassword(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Methods
 */
UserSchema.methods = {
  toJSON() {
    const { password, _id, __v, ...rest } = this.toObject();
    return { ...rest, id: _id };
  }
};

export default model<UserInterface>('user', UserSchema);
