const joi = require("joi");

exports.productSchema = joi.object({
    name: joi.string().required().min(3).max(30),
    price: joi.number().required(),
    quantity: joi.number().required().exist(),
    category: joi.string().min(2).required(),
});

exports.updateProductSchema = joi.object({
    name: joi.string().min(3).max(30),
    price: joi.number(),
    quantity: joi.number().exist(),
    category: joi.string().min(2)
})