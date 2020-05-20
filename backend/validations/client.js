const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Basic schemas
// Compound schemas
const addPlateSchema = Joi.object().keys({
	plate_id: Joi.number().integer().required(),
});

const ratingSchema = Joi.object().keys({
	rate: Joi.number().min(0).max(5).required(),
	comment: Joi.string().max(2000),
});

module.exports = {
	addPlateSchema,
	ratingSchema,
};
