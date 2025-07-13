const User = require('../models/user');

class UserRepository {
  async findById(id) {
    return User.findById(id);
  }

  async updatePassword(user, newPassword) {
    user.password = newPassword;
    return user.save();
  }

  async updateName(user, firstName, lastName) {
    user.firstName = firstName;
    user.lastName = lastName;
    return user.save();
  }

  async saveProfilePhoto(user, photoPath) {
    if (user.profilePicture) {
      user.oldProfilePictures.push(user.profilePicture);
    }
    user.profilePicture = photoPath;
    return user.save();
  }
}

module.exports =  UserRepository;