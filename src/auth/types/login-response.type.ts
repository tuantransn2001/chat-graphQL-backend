import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/types/user.type';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;
}
