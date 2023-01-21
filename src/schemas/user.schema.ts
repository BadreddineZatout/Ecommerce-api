import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAddress } from 'src/interfaces';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isSeller: boolean;

  @Prop(
    raw({
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: Number },
    }),
  )
  address: Record<string, IAddress>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
