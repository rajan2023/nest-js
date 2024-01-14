import { BadRequestException as Exception } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { formatErrorMessage } from "src/utils/errorHandler.utils";

const reduceErrors = (errors: ValidationError[]) => {
  return errors?.reduce((obj, item) => {
    if (item.children?.length > 0) {
      obj[item.property] = reduceErrors(item.children);
    } else {
      obj[item.property] = formatErrorMessage(
        Array.isArray(Object.values(item.constraints))
          ? Object.values(item.constraints)[0]
          : Object.values(item.constraints).toString(),
      );
    }
    return obj;
  }, {});
};

export class BadRequestException extends Exception {
  constructor(
    private readonly errors: ValidationError[],
    statusCode: number = 400,
  ) {
    const errorsMessages = reduceErrors(errors);
    super({
      statusCode,
      errors: errorsMessages,
      message: "Validation failed",
      data: {},
    });

    // super({
    //   statusCode: 400,
    //   errors,
    //   message: "Validation failed",
    //   data: {},
    // });
    // super("Validation failed", [message]);
  }
}
