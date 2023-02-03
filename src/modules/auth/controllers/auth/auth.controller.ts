import { IAuthPayload } from '../../../../interfaces';
import {
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './../../../users/services/users/users.service';
import { Controller } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../../dtos/auth.dto';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils/user.decorator';
import { SellerGuard } from '../../guards/seller.guard';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('users')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll(@User() user: any) {
    console.log(user);
    return await this.usersService.findAll();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.usersService.findByLogin(userDTO);
    const payload: IAuthPayload = {
      username: user.username,
      isSeller: user.isSeller,
    };

    const token = await this.authService.getToken(payload);

    return { user, token };
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.usersService.create(userDTO);
    const payload: IAuthPayload = {
      username: user.username,
      isSeller: user.isSeller,
    };

    const token = await this.authService.getToken(payload);

    return { user, token };
  }
}
