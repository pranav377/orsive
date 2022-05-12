import Joi from "joi";

export const EDIT_PROFILE_VALIDATOR = Joi.object({
  username: Joi.string().regex(/[A-Za-z0-9-._~]/),
  name: Joi.string().required(),
  avatar: Joi.any(),
  banner: Joi.any(),
  bio: Joi.string().allow("").optional().max(50),
});
