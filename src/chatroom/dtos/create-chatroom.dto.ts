import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { RESPONSE_MESSAGE } from 'src/commons/constants/response.message';

@InputType()
export class CreateChatroomDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.NAME_IS_REQUIRED })
  name: string;
  @IsArray()
  @Field(() => [String])
  userIds: string[];
}
