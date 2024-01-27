import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [
    ChatroomService,
    ChatroomResolver,
    PrismaService,
    UserService,
    JwtService,
    CloudinaryService,
  ],
})
export class ChatroomModule {}
