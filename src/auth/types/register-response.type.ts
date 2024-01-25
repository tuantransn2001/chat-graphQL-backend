import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/types/user.type';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
