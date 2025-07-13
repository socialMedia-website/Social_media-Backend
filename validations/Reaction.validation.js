const Joi = require('joi');

const reactionSchema = Joi.object({
  type: Joi.string().valid('Like', 'Love', 'Angry', 'Sad', 'Care').required(),
});

module.exports = {
  validateReaction: (req, res, next) => {
    const { error } = reactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};