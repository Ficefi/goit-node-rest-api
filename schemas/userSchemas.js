const Joi = require("joi");

const createUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().min(6).required(),
});

module.exports = {
	createUserSchema,
	loginUserSchema,
};
