import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { LoginDTO, RegisterDTO } from 'src/modules/auth/dtos/auth.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
  ) {}

  private excludePassword(user: IUser) {
    const userObject = user.toObject();
    delete userObject['password'];
    return userObject;
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = new this.userModel(userDTO);
    await newUser.save();

    return this.excludePassword(newUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.excludePassword(user);
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async findByName(payload: any) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
