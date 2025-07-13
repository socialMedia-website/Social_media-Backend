const Joi = require('joi');

const friendRequestSchema = Joi.object({
  _id: Joi.string().length(24).hex().required().messages({
    'string.length': 'Invalid user ID format',
    'any.required': 'User ID is required',
  }),
});

module.exports = {
  validateFriendRequest: (req, res, next) => {
    const { error } = friendRequestSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};