import { Schema, model } from 'mongoose';
import { regexes } from './validators/validators';
import { isEmail } from 'validator';
import { isValidFrenchPhoneNumber } from '../utils/validation.utils';
import { UserDocument } from './types/User.types';
import bcrypt from 'bcrypt';
import { formatName } from '../utils/string.utils';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRATION } = process.env;

if (!JWT_SECRET || JWT_SECRET === '') {
  throw new Error('JWT_SECRET is undefined!');
} else if (!JWT_EXPIRATION || JWT_EXPIRATION === '') {
  throw new Error('JWT_EXPIRATION is undefined!');
}

/**
 * TODO:
 * add validators for avatar (define accepted file formats, sizes...)
 * add pre('save') middleware to hash password, comparePasswords method, createJWT method
 */

const userSchema = new Schema<UserDocument>(
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre(
  'save',
  async function (this: UserDocument, next: (err?: Error) => void) {
    try {
      // check if the password is modified
      if (this.isModified('password')) {
        // hash the password only if it is modified
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
      }

      // format user firstName and lastName
      if (this.isModified('firstName')) {
        this.firstName = formatName(this.firstName);
      }

      if (this.isModified('lastName')) {
        this.lastName = formatName(this.lastName);
      }

      next();
    } catch (error: any) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error('An unexpected error occurred.'));
      }
    }
  }
);

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    throw new Error('An error occurred while comparing passwords.');
  }
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
};

const User = model('User', userSchema);

export default User;
