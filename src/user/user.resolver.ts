import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './types/user.type';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('fullname') fullname: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
    @Context() context: { req: Request },
  ) {
    const imageUrl = file
      ? await this.cloudinaryService.storeImageAndGetUrl(file)
      : null;
    const userId = context.req.user.sub;
    return this.userService.updateProfile(userId, fullname, imageUrl);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [User])
  async searchUsers(
    @Args('fullname') fullname: string,
    @Context() context: { req: Request },
  ) {
    return this.userService.searchUsers(fullname, context.req.user.sub);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [User])
  getUsersOfChatroom(@Args('chatroomId') chatroomId: number) {
    return this.userService.getUsersOfChatroom(chatroomId);
  }
}
