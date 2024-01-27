import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RESPONSE_MESSAGE } from '@common/constants/response.message';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.EMAIL_IS_REQUIRED })
  @IsEmail({}, { message: RESPONSE_MESSAGE.EMAIL_MUST_BE_VALID })
  email: string;

  @Field()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.PASSWORD_IS_REQUIRED })
  password: string;
}
