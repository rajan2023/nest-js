import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
// catch all error
@Catch()
export default class InternalServerErrorException implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    let { message: errMsg, stack: errStack, name: errName } = exception;

    let ctx = host.switchToHttp();
    let req = ctx.getRequest();
    let res : Response = ctx.getResponse();
    const statusName = "Internal Server Error";
    res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      return res.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    return res.status(500).json({
     
      statusCode: 500,
      errors: Array.isArray(errMsg) ? errMsg : [errMsg],
      message: errName,
      data:{}
    });
  }
}
