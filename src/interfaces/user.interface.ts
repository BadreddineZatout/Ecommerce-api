import { IAddress } from 'src/interfaces';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
  isSeller: boolean;
  address: IAddress;
  createdAt: Date;
}
