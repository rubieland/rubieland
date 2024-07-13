import { Document } from 'mongoose';

export interface IPrestation {
  title: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export type PrestationData = Omit<IPrestation, 'isAvailable'> & {
  isAvailable: string;
};

export type PrestationField = keyof IPrestation;
export interface PrestationDocument extends IPrestation, Document {}
