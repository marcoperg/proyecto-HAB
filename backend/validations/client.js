const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Basic schemas
// Compound schemas
const addPlateSchema = Joi.object().keys({
	plate_id: Joi.number().integer(),
});

module.exports = {
	addPlateSchema,
};
