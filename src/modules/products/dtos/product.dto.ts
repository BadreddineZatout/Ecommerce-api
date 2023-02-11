import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  @Length(3, 255)
  description: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
