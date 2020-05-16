const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Basic schemas
const nameSchema = Joi.string().error(
	generateError("The name of the shop is required", 400)
);

const descriptionShema = Joi.string()
	.min(3)
	.error(
		generateError("The description must be at least 5 characters long", 400)
	);

const emailSchema = Joi.string()
	.email()
	.error(generateError("The email must be well formed", 400));

// Compund schemas
const shopSchema = Joi.object().keys({
	name: nameSchema,
	descripion: descriptionShema,
	email: emailSchema,
	tlf: Joi.number().integer(),

	address_line1: Joi.string(),
	address_line2: Joi.string(),
	city: Joi.string(),
	state: Joi.string(),
	country: Joi.string(),
});

const newShopSchema = Joi.object().keys({
	name: nameSchema.required(),
	description: descriptionShema.required(),
	email: emailSchema.required(),
	tlf: Joi.number().integer().required(),

	address_line1: Joi.string().required(),
	address_line2: Joi.string(),
	city: Joi.string().required(),
	state: Joi.string(),
	country: Joi.string().required(),
});

module.exports = {
	shopSchema,
	newShopSchema,
};
