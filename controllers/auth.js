const User = require('../models/user');
const createJWT = require('../config/jwt');  
const bcrypt = require('bcryptjs');
const sendEmail = require('../config/sendEmail');

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, birthday, gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthday,
            gender
        });

        const savedUser = await user.save();
        if (!savedUser) {
            const err = new Error('Cannot save user');
            return next(err);
        }

        res.status(200).json({ success: true, message: 'User signed up successfully, now you can login' });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Could not find user with this email, you can try to sign up' });
        }

        const isEqual = await bcrypt.compare(password, user.password);  
        if (!isEqual) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        
        const token = createJWT(user._id);
        res.status(200).json({ success: true, message: 'User logged in successfully', data: { token, userId: user._id } });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const err = new Error('Could not find user with this email!');
            err.statusCode = 404;
            return next(err);
        }

        const resetToken = user.createToken();
        if (!resetToken) {
            const err = new Error('Could not generate reset token');
            err.statusCode = 500;
            return next(err);
        }

        await user.save();

        const resetURL = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password to:\n${resetURL}\nIf you did not forget your password, ignore this email.`;

        await sendEmail(email, message);

        res.status(200).json({ success: true, message: 'Token sent to email!' });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const { resetToken } = req.params;

        if (password !== confirmPassword) {
            const err = new Error('Confirm password does not match new password');
            err.statusCode = 400;
            return next(err);
        }

        const user = await User.findOne({
            passwordResetToken: resetToken,
            tokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            const err = new Error('Invalid or expired token');
            err.statusCode = 400;
            return next(err);
        }

        user.password = await bcrypt.hash(password, 12);  
        user.passwordResetToken = null;
        user.tokenExpiration = null;

        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};
