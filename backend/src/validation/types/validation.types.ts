import { UserField } from '../../models/types/User.types';

// enum for the reasons of a field validation fail
export enum Reason {
  INVALID = 'invalid',
  REQUIRED = 'required',
  MINLENGTH = 'minLength',
  MAXLENGTH = 'maxLength',
}

export interface UserFieldLengths {
  [key: string]: {
    maxLength: number;
    minLength: number;
  };
}

export type ValidatePhoneNumberFunction = (phoneNumber: string) => boolean;

interface ValidationErrorMessageParams {
  field: string;
  rule?: string;
  minLength?: number;
  maxLength?: number;
  reason: Reason;
}

export type GetValidationErrorMessageFunction = (
  params: ValidationErrorMessageParams,
) => string;

export type GetMissingOrEmptyFieldsFunction = (data: any) => string[];

export type GetMissingOrEmptyFieldsErrorMessageFunction = (
  fields: string[],
) => string[];

export type FieldLengthValidatorFunction = (
  field: string,
  value: string,
  maxLength: number,
) => string;

export type FieldFormatValidatorFunction = (
  fieldType: UserField,
  fieldValue: string,
) => string;
