import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/types/user.type';
import { Message } from './message.type';

@ObjectType()
export class Chatroom {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => [User], { nullable: true }) // array of user IDs
  users?: User[];

  @Field(() => [Message], { nullable: true }) // array of message IDs
  messages?: Message[];
}
