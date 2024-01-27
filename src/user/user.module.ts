import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [
    UserService,
    UserResolver,
    PrismaService,
    JwtService,
    CloudinaryService,
  ],
})
export class UserModule {}
