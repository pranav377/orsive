import Joi from "joi";

export const ADD_IMAGE_POST_VALIDATOR = Joi.object({
  image: Joi.any().required(),
  title: Joi.string().allow("").optional().max(255),
});

export const IMAGE_VALIDATOR = Joi.object({
  slug: Joi.string().required(),
});

export const UPDATE_IMAGE_POST_VALIDATOR = Joi.object({
  image: Joi.any(),
  title: Joi.string().allow("").optional().max(255),
  slug: Joi.string().required(),
});
