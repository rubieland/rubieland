// enum for the reasons of a field validation fail
export enum Reason {
  INVALID = 'invalid',
  REQUIRED = 'required',
  MINLENGTH = 'minLength',
  MAXLENGTH = 'maxLength',
  MIN = 'min',
  MAX = 'max',
  HAS_FORBIDDEN_CHARS = 'hasForbiddenChars',
}

export enum DataContext {
  USER = 'user',
  BLOG_ARTICLE = 'blogArticle',
  PRESTATION = 'prestation',
}

export interface DataLengths {
  [key: string]: {
    maxLength: number;
    minLength: number;
  };
}

export interface DataMinMax {
  [key: string]: {
    max: number;
    min: number;
  };
}

export type ValidatePhoneNumberFunction = (phoneNumber: string) => boolean;

interface ValidationErrorMessageParams {
  field: string;
  rule?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  reason: Reason;
  context: DataContext;
}

export type GetValidationErrorMessageFunction = (
  params: ValidationErrorMessageParams,
) => string;

export type GetMissingOrEmptyFieldsFunction = (data: any) => string[];

export type GetMissingOrEmptyFieldsErrorMessageFunction = (
  context: DataContext,
  fields: string[],
) => string[];

export type MinMaxValidatorFunction = (
  fieldValue: string | number,
  mixMaxValue: number,
) => boolean;

export type FieldFormatValidatorFunction = (fieldValue: string) => boolean;
