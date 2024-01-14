import { BadRequestException } from "./badRequest.exception";

interface IError {
  [key: string]: string;
}

export default class AppException {
  constructor(public errors: IError = {}, public statusCode: number = 400) {
    this.errors = errors;
    this.parseErrors();
  }

  parseErrors() {
    const errorsMessages = Object.keys(this.errors).map(key => {
      return {
        target: { key },
        property: key,
        constraints: {
          key: this.errors[key],
        },
        value: key,
      };
    });
    throw new BadRequestException(errorsMessages, this.statusCode);
  }
}
