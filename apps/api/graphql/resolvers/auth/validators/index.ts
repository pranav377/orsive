import Joi from "joi";
import { langs } from "../../../../../../packages/config/global-lang-list.json";

export const SIGNUP_VALIDATOR = Joi.object({
  username: Joi.string()
    .required()
    .regex(/[A-Za-z0-9-._~]/),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required().max(50),
  otp: Joi.string().required().max(4),
});

export const SIGNIN_VALIDATOR = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const OTP_VALIDATOR = Joi.object({
  email: Joi.string().email().required(),
});

export const GET_USER_VALIDATOR = Joi.object({
  username: Joi.string().required(),
});

export const CHECK_USERNAME_VALIDATOR = Joi.object({
  username: Joi.string().required(),
});

export const CHECK_EMAIL_VALIDATOR = Joi.object({
  email: Joi.string().email().required(),
});

export const SETUP_LANGGUAGES_VALIDATOR = Joi.object({
  langs: Joi.array()
    .allow(...langs)
    .required(),
});
