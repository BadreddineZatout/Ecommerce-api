import { Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UsersService } from './../../../users/services/users/users.service';
import { Controller } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../../dtos/auth.dto';

@Controller('')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDTO: LoginDTO) {
    return await this.usersService.findByLogin(userDTO);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDTO: RegisterDTO) {
    return await this.usersService.create(userDTO);
  }
}
