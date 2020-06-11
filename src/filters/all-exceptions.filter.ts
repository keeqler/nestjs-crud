import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

interface BadRequestResponse {
  statusCode: number;
  message: Array<string>;
  errors: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      if (status === 400) {
        body = { errors: (exception.getResponse() as BadRequestResponse).message };
      }
    } else {
      console.error(exception);
    }

    response.status(status).send(body);
  }
}
