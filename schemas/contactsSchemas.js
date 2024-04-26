const Joi = require("joi");

const createContactSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	phone: Joi.string().min(6).required(),
});

const updateContactSchema = Joi.object({
	name: Joi.string().min(3).max(30),
	email: Joi.string().email({ minDomainSegments: 2 }),
	phone: Joi.string().min(6),
})
	.min(1)
	.message("Body must have at least one field");

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
};

// left for future
// .pattern(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"))
