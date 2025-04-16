const mongoose = require('mongoose');

// Middleware to validate any number of ObjectIds dynamically
const validateObjectIds = (req, res, next) => {
    const invalidIds = [];

    // Loop through all route parameters
    for (const key in req.params) {
        if (!mongoose.Types.ObjectId.isValid(req.params[key])) {
            invalidIds.push(key); // Store invalid parameter names
        }
    }

    if (invalidIds.length > 0) {
        return res.status(400).json({ 
            message: `Invalid ObjectId(s): ${invalidIds.join(', ')}` 
        });
    }

    next(); // Continue if all IDs are valid
};

module.exports = validateObjectIds;
