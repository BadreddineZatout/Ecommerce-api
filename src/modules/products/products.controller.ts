import { IProduct } from './../../interfaces/product.interface';
import { IUser } from './../../interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateProductDTO, UpdateProductDTO } from './dtos/product.dto';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SellerGuard } from '../auth/guards/seller.guard';
import { User } from 'src/utils/user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async getAll(): Promise<IProduct[]> {
    return await this.productService.getAll();
  }

  @Get('/my-products')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async getOwnProducts(@User() user: IUser): Promise<IProduct[]> {
    const { id } = user;
    return await this.productService.getByOwner(id);
  }

  @Get('/seller/:id')
  async getBySeller(@Param('id') id: string): Promise<IProduct[]> {
    return await this.productService.getByOwner(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() productDto: CreateProductDTO,
    @User() user: IUser,
  ): Promise<IProduct> {
    return await this.productService.create(productDto, user);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<IProduct> {
    return await this.productService.get(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDTO,
    @User() user: IUser,
  ): Promise<IProduct> {
    const { id: userId } = user;
    return await this.productService.update(id, productDto, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async remove(
    @Param('id') id: string,
    @User() user: IUser,
  ): Promise<IProduct> {
    const { id: userId } = user;
    return await this.productService.delete(id, userId);
  }
}
