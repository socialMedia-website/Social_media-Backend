const Joi = require('joi');


const postSchema = Joi.object({
    content: Joi.string().min(1).required().messages({
        'string.empty': 'Content cannot be empty',
        'any.required': 'Content is required',
    }),
    image: Joi.string().uri().optional().messages({
        'string.uri': 'Image must be a valid URL',
    }),
});

// Middleware for validating post data
const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validatePost,
};