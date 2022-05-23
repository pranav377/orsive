import Joi from "joi";

export default function validateAsync(
  args: any,
  schema: Joi.ObjectPropertiesSchema<any>
) {
  return schema.validateAsync(args);
}
