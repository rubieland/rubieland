import { Document, Schema, model } from 'mongoose';

interface UserInput extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
}

/**
 * TODO:
 * add validators
 * add validation messages with i18n
 * add pre('save') middleware to hash password, comparePasswords method, createJWT method
 */

const userSchema = new Schema<UserInput>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      minLength: 6,
    },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
