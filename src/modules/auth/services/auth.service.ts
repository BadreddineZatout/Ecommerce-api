import { UsersService } from './../../users/services/users/users.service';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IAuthPayload } from '../../../interfaces';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async getToken(payload: IAuthPayload) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }

  async validateUser(payload: IAuthPayload) {
    return await this.usersService.findByName(payload);
  }
}
