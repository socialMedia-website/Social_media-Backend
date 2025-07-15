const Joi = require('joi');

const createStorySchema = Joi.object({
  content: Joi.string().allow('', null),

}).custom((value, helpers) => {
  if (!value.content && !helpers.state.ancestors[0].file) {
    return helpers.error('any.required');
  }
  return value;
}).messages({
  'any.required': 'You must provide either content or an image.',
});

const validateCreateStory = (req, res, next) => {
  const { error } = createStorySchema.validate(req.body, { context: { file: req.file } });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateCreateStory };