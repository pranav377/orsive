import Joi from 'joi';

export default function validateAsync(
    args: any,
    schema: Joi.ObjectSchema<any>
) {
    return schema.validateAsync(args);
}
