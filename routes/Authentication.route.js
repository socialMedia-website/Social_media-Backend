const express = require('express');
const { makeInvoker } = require('awilix-express');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../validations/Auth.validation');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();
const api = makeInvoker((cradle) => cradle.authController);
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthday:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
router.post('/signup', validateRequest(registerSchema), api('register'));
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in an existing user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 */
router.post('/login', validateRequest(loginSchema), api('login'));
/**
 * @swagger
 * /api/auth/forgotPassword:
 *   post:
 *     summary: Forgot password
 *     description: Sends a password reset link to the user's email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token sent to email
 *       404:
 *         description: User not found
 */
router.post('/forgotpassword', validateRequest(forgotPasswordSchema), api('forgotPassword'));
/**
 * @swagger
 * /api/auth/resetPassword/{resetToken}:
 *   patch:
 *     summary: Reset password
 *     description: Resets the user's password using a token.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.put('/resetPassword/:resetToken', validateRequest(resetPasswordSchema), api('resetPassword'));

module.exports = router;