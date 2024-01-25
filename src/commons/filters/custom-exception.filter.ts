import { ApolloError } from 'apollo-server-express';
import { Catch, BadRequestException } from '@nestjs/common';

import { GqlExceptionFilter } from '@nestjs/graphql';
import { RESPONSE_MESSAGE } from 'src/commons/constants/response.message';
@Catch(BadRequestException)
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException) {
    const response = exception.getResponse();

    if (typeof response === 'object') {
      // Directly throw ApolloError with the response object.
      throw new ApolloError(
        RESPONSE_MESSAGE.VALIDATION_ERROR,
        RESPONSE_MESSAGE.VALIDATION_ERROR_CODE,
        response,
      );
    } else {
      throw new ApolloError(RESPONSE_MESSAGE.BAD_REQUEST);
    }
  }
}
