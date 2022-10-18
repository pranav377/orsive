import Joi from "joi";
import validateHTMLContent from "../../../utils/validators/html/validateHTMLContent";

export const CREATE_COMMENT_VALIDATOR = Joi.object({
  content: Joi.string()
    .required()
    .external(validateHTMLContent, "HTML content validation"),
  post_id: Joi.string().required(),
});

export const CREATE_REPLY_VALIDATOR = Joi.object({
  content: Joi.string()
    .required()
    .external(validateHTMLContent, "HTML content validation"),
  parent_id: Joi.string().required(),
});
