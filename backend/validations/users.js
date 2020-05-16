const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Basic schemas
const passwordSchema = Joi.string()
	.min(6)
	.max(100)
	.required()
	.error(new Error("The password must have at least 6 characters."));

const emailSchema = Joi.string()
	.email()
	.error(new Error("The provided email is not well formed."));

// Compound schemas
const userInfoSchema = Joi.object().keys({
	nick: Joi.string(),
	first_name: Joi.string(),
	last_name: Joi.string(),
	email: emailSchema,
	tlf: Joi.number().integer(),
	birthday: Joi.date(),
	address_line1: Joi.string(),
	address_line2: Joi.string(),
	city: Joi.string(),
	state: Joi.string(),
	country: Joi.string(),
});

const registrationSchema = userInfoSchema.append({
	password: passwordSchema,
	seller: Joi.bool(),
	nick: Joi.string().required(),
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	email: emailSchema,
	birthday: Joi.date(),
});

const loginSchema = Joi.object().keys({
	username: Joi.string()
		.required()
		.error(generateError("The username is required", 400)),
	password: passwordSchema,
});

const editPasswordUserSchema = Joi.object().keys({
	old_password: passwordSchema,
	new_password: passwordSchema
		.invalid(Joi.ref("old_password"))
		.error(
			generateError("The new password must not be equal to the old one", 400)
		),
	new_password_repeat: Joi.any()
		.valid(Joi.ref("new_password"))
		.error(generateError("The password must be equal", 400)),
});

module.exports = {
	userInfoSchema,
	registrationSchema,
	loginSchema,
	editPasswordUserSchema,
};