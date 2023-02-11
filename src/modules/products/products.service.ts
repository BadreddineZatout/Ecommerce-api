import { CreateProductDTO, UpdateProductDTO } from './dtos/product.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct, IUser } from 'src/interfaces';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async getAll(): Promise<IProduct[]> {
    return await this.productModel.find().populate('owner');
  }

  async get(id: string): Promise<IProduct> {
    return await this.productModel.findById(id).populate('owner');
  }

  async getByOwner(userId: string): Promise<IProduct[]> {
    return await this.productModel.find({ owner: userId }).populate('owner');
  }

  async create(data: CreateProductDTO, user: IUser): Promise<IProduct> {
    const product = await this.productModel.create({
      ...data,
      owner: user,
    });
    await product.save();

    return product.populate('owner');
  }

  async update(
    id: string,
    data: UpdateProductDTO,
    userId: string,
  ): Promise<IProduct> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    if (userId !== product.owner.toString()) {
      throw new HttpException(
        'You do own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await product.update(data);
    return product.populate('owner');
  }

  async delete(id: string, userId: string): Promise<IProduct> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    if (userId !== product.owner.toString()) {
      throw new HttpException(
        'You do own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await product.remove();
    return product.populate('owner');
  }
}
