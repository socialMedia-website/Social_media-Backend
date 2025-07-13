const Joi = require('joi');

// Validation schema for creating/updating a comment
const commentSchema = Joi.object({
    content: Joi.string().min(1).required().messages({
        'string.empty': 'Content cannot be empty',
        'any.required': 'Content is required',
    }),
});

// Validation schema for reacting to a comment
const reactionSchema = Joi.object({
    type: Joi.string().valid('like', 'dislike', 'love', 'angry').required().messages({
        'any.only': 'Reaction type must be one of like, dislike, love, or angry',
        'any.required': 'Reaction type is required',
    }),
});


module.exports = {
    validateComment: (req, res, next) => {
        const { error } = commentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    },
    validateReaction: (req, res, next) => {
        const { error } = reactionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    },
 
};