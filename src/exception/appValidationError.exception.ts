import { BadRequestException } from "./badRequest.exception";

interface IError {
  [key: string]: string;
}

export default class AppValidationException {
  constructor(public errors: IError = {}) {
    this.errors = errors;
    this.parseErrors();
  }

  parseErrors() {
    const errorsMessages = Object.keys(this.errors).map(key => {
      return {
        target: { key },
        property: key,
        constraints: {
          key: (this.errors[key]),
        },
        value: key,
      };
    });
    throw new BadRequestException(errorsMessages);
    // return new BadRequestException(this.errors);
  }
}
