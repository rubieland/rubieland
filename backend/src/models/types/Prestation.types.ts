import { Document } from 'mongoose';

export interface IPrestation {
  title: string;
  description: string;
  price: number;
}

export type PrestationField = keyof IPrestation;
export interface PrestationDocument extends IPrestation, Document {}
