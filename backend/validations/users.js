const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

const registrationSchema = Joi.object().keys({
	nick: Joi.string().required(),
	password: Joi.string()
		.min(6)
		.max(100)
		.required()
		.error(new Error("The password must have at least 6 characters.")),
	seller: Joi.bool(),
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	email: Joi.string()
		.email()
		.required()
		.error(new Error("The provided email is not well formed.")),
	tlf: Joi.number().integer(),
	birthday: Joi.date().required(),
	address_line1: Joi.string(),
	address_line2: Joi.string(),
	city: Joi.string(),
	state: Joi.string(),
	country: Joi.string(),
});

const loginSchema = Joi.object().keys({
	username: Joi.string()
		.required()
		.error(generateError("The username is required", 400)),
	password: Joi.string()
		.required()
		.error(generateError("The password is required", 400)),
});

module.exports = {
	registrationSchema,
	loginSchema,
};
