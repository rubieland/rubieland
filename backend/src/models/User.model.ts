import { Document, Schema, model } from 'mongoose';
import { regexes } from './validators/validators';
import { isEmail } from 'validator';
import { isValidFrenchPhoneNumber } from '../utils/validation.utils';

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
}

/**
 * TODO:
 * add validators for avatar (define accepted file formats, sizes...)
 * add pre('save') middleware to hash password, comparePasswords method, createJWT method
 */

const userSchema = new Schema<UserInput, Document>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minlength: 2,
      validate: {
        validator: (v: string) => regexes.nameField.test(v),
        message: `Le prénom est invalide. Il ne peut contenir que des lettres, traits d'union, espaces et apostrophes.`,
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minlength: 2,
      validate: {
        validator: (v: string) => regexes.nameField.test(v),
        message: `Le nom de famille est invalide. Il ne peut contenir que des lettres, traits d'union, espaces et apostrophes.`,
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      maxLength: 254,
      validate: {
        validator: (v: string) => isEmail(v),
        message: `Email incorrect. Veuillez entrer un email valide (mon.adresse@email.com).`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 128,
      minLength: 8,
      validate: {
        validator: (v: string) => regexes.password.test(v),
        message:
          'Mot de passe invalide. Les caractères suivants ne sont pas acceptés: < > ( ) { } \\ et `',
      },
    },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
      validate: {
        validator: (v: string) => isValidFrenchPhoneNumber(v),
        message: `Numéro de téléphone invalide. Veuillez entrer un numéro au format "0XXXXXXXXX" ou "+33XXXXXXXXX"`,
      },
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
