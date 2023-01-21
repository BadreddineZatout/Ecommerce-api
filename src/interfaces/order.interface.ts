import { IOrderProduct, IUser } from 'src/interfaces';
import { Document } from 'mongoose';

export interface IOrder extends Document {
  owner: IUser;
  totalPrice: number;
  products: IOrderProduct[];
  createdAt: Date;
}
