import Joi from "joi";
import validateHTMLContent from "../../../../utils/validators/html/validateHTMLContent";

export const ADD_ORSIC_POST_VALIDATOR = Joi.object({
  title: Joi.string().allow("").optional().max(255),
  content: Joi.string()
    .required()
    .external(validateHTMLContent, "HTML content validation"),
});

export const UPDATE_ORSIC_POST_VALIDATOR = Joi.object({
  title: Joi.string().allow("").optional().max(255),
  content: Joi.string()
    .required()
    .external(validateHTMLContent, "HTML content validation"),
  slug: Joi.string().required(),
});

export const GET_ORSIC_POST_VALIDATOR = Joi.object({
  slug: Joi.string().required(),
});

export const DELETE_ORSIC_POST_VALIDATOR = Joi.object({
  slug: Joi.string().required(),
});
