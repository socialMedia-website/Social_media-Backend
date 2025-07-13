const express = require('express');
const { makeInvoker } = require('awilix-express');
const multer = require("multer");
const path = require('path');
const authMiddleware = require('../middleware/is-Auth');

const router = express.Router();
const api = makeInvoker((cradle) => cradle.userController);

const storage = multer.diskStorage({
  destination: "./uploads/profiles/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
/**
 * @swagger
 * /api/users/profile-photo:
 *   post:
 *     summary: Upload profile photo
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile photo uploaded successfully
 *       500:
 *         description: Server error
 */
router.post("/profile-photo", authMiddleware, upload.single("profilePhoto"), api('uploadProfilePhoto'));
/**
 * @swagger
 * /api/users/update-password:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                       type: string
 *   
 *               newPassword:
 *                   type: string
 *               verifyiedNewPassword:
 *                  type: string
 *              
 *     responses:
 *       200:
 *         description: password updated successfully
 *       500:
 *         description: Server error
 */
router.put("/update-password", authMiddleware, api('editpassword'));
/**
 * @swagger
 * /api/users/update-name:
 *   put:
 *     summary: Update user name
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                       type: string
 *   
 *              
 *     responses:
 *       200:
 *         description: user name updated successfully
 *       500:
 *         description: Server error
 */
router.put("/update-name", authMiddleware, api('editName'));
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/profile", authMiddleware, api('getUserProfile'));

module.exports = router;