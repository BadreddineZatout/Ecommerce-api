import { Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IProduct extends Document {
  owner: IUser;
  title: string;
  description: string;
  image: string;
  price: number;
  createdAt: Date;
}
