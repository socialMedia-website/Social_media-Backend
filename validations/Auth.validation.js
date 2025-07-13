const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  birthday: Joi.date().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
});

const loginSchema  = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const forgotPasswordSchema  = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema  = Joi.object({
  password: Joi.string().min(6).required(),
  confirmpassword: Joi.ref("password"),
});

module.exports = {
  registerSchema ,
  loginSchema ,
  forgotPasswordSchema ,
  resetPasswordSchema ,
};
