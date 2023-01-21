import * as mongoose from 'mongoose';
export interface IOrderProduct {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}
