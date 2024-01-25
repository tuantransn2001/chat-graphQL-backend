import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/types/user.type';

@ObjectType()
export class UserTyping {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  chatroomId?: number;
}
