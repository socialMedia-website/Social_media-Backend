const bcrypt = require('bcryptjs');
const createJWT = require('../config/jwt');
const sendEmail = require('../config/sendEmail');

class AuthService {
  constructor({ authRepository }) {
    this.authRepository = authRepository;
  }

  async register(data) {
    const { firstName, lastName, email, password, birthday, gender, publicKey } = data;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.authRepository.create({
      firstName, lastName, email, password: hashedPassword, birthday, gender, publicKey
    });
    if (!user) throw new Error('Cannot save user');
    return user;
  }

  async login(email, password) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new Error('Could not find user with this email');
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new Error('Incorrect password');
    const token = createJWT(user._id);
    return { token, userId: user._id };
  }

  async forgotPassword(email, protocol, host) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new Error('Could not find user with this email!');
    const resetToken = user.createToken();
    if (!resetToken) throw new Error('Could not generate reset token');
    await this.authRepository.save(user);
    const resetURL = `${protocol}://${host}/api/auth/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to:\n${resetURL}\nIf you did not forget your password, ignore this email.`;
    await sendEmail(email, message);
    return 'Token sent to email!';
  }

  async resetPassword(resetToken, password, confirmPassword) {
    if (password !== confirmPassword) throw new Error('Confirm password does not match new password');
    const user = await this.authRepository.findByResetToken(resetToken);
    if (!user) throw new Error('Invalid or expired token');
    user.password = await bcrypt.hash(password, 12);
    user.passwordResetToken = null;
    user.tokenExpiration = null;
    await this.authRepository.save(user);
    return 'Password reset successfully.';
  }
}

module.exports = AuthService;