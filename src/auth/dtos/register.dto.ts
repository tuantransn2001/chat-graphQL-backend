import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RESPONSE_MESSAGE } from '@common/constants/response.message';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.FULLNAME_IS_REQUIRED })
  @IsString({ message: RESPONSE_MESSAGE.FULLNAME_MUST_BE_A_STRING })
  fullname: string;

  @Field()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.PASSWORD_IS_REQUIRED })
  @MinLength(8, {
    message: RESPONSE_MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS,
  })
  password: string;

  // confirm password must be the same as password

  @Field()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED })
  // must be the same as password
  confirmPassword: string;

  @Field()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.EMAIL_IS_REQUIRED })
  @IsEmail({}, { message: RESPONSE_MESSAGE.EMAIL_MUST_BE_VALID })
  email: string;
}
