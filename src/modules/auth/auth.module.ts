import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
