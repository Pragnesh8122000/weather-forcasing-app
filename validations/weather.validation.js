const Joi = require("joi");
const weatherValidation = Joi.object({
    city: Joi.string().max(20).required(),
});

module.exports = {
    weatherValidation,
};
