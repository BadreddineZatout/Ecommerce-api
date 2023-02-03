import { UsersService } from './../../users/services/users/users.service';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async getToken(payload: any) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }

  async validateUser(payload: any) {
    return await this.usersService.findByName(payload);
  }
}
