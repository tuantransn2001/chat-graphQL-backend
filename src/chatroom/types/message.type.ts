import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Chatroom } from './chatroom.type';
import { User } from 'src/user/types/user.type';

@ObjectType()
export class Message {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Chatroom, { nullable: true }) // array of user IDs
  chatroom?: Chatroom;

  @Field(() => User, { nullable: true }) // array of user IDs
  user?: User;
}
