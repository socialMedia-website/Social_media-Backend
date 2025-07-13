const bcryptjs = require("bcryptjs");

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async editPassword(userId, oldPassword, newPassword, verifyiedNewPassword) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User is not found!");

    const result = await bcryptjs.compare(oldPassword, user.password);
    if (!result) throw new Error("Old password is not true");

    if (newPassword !== verifyiedNewPassword)
      throw new Error("New password and its verification password are not equal");

    const hashedNewPassword = await bcryptjs.hash(newPassword, 12);
    await this.userRepository.updatePassword(user, hashedNewPassword);
    return "Password is updated successfully";
  }

  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    user.password = undefined;
    return user;
  }

  async uploadProfilePhoto(userId, file) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const photoPath = `/uploads/profiles/${file.filename}`;
    await this.userRepository.saveProfilePhoto(user, photoPath);
    return user;
  }

  async editName(userId, firstName, lastName) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    await this.userRepository.updateName(user, firstName, lastName);
    return "User name is updated successfully";
  }
}

module.exports =  UserService;