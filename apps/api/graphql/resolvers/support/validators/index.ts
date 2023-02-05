import Joi from 'joi';

export const ADD_CONTACT_VALIDATOR = Joi.object({
    type: Joi.string()
        .required()
        .valid('bug_report', 'feature_request', 'business_inquiry', 'others'),
    content: Joi.string().required().max(1000),
});
