import Joi from 'joi';

export const ADD_LIKE_VALIDATOR = Joi.object({
    id: Joi.string().required(),
    like_type: Joi.string().valid('like', 'dislike').required(),
});
