import Joi from "joi";
import { UserInputError } from "apollo-server-express";

export default function validate(args: any, schema: Joi.ObjectSchema<any>) {
  const { value, error } = schema.validate(args);

  if (error) {
    throw new UserInputError("Aborting operation as user's data is evil", {
      validationErrors: error,
    });
  }

  return value;
}
