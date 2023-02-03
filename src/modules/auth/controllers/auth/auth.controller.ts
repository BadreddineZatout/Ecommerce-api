import { Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UsersService } from './../../../users/services/users/users.service';
import { Controller } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../../dtos/auth.dto';
import { AuthService } from '../../services/auth.service';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.usersService.findByLogin(userDTO);
    const payload = {
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
    const payload = {
      username: user.username,
      isSeller: user.isSeller,
    };

    const token = await this.authService.getToken(payload);

    return { user, token };
  }
}
