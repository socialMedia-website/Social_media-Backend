 class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  editpassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword, verifyiedNewPassword } = req.body;
      const message = await this.userService.editPassword(
        req.userId,
        oldPassword,
        newPassword,
        verifyiedNewPassword
      );
      return res.status(201).json({ message });
    } catch (error) {
      next(error);
    }
  };

  getUserProfile = async (req, res, next) => {
    try {
      const user = await this.userService.getUserProfile(req.userId);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  };

  uploadProfilePhoto = async (req, res, next) => {
    try {
      const user = await this.userService.uploadProfilePhoto(req.userId, req.file);
      return res.json({ message: "Profile photo updated successfully", user });
    } catch (error) {
      next(error);
    }
  };

  editName = async (req, res, next) => {
    try {
      const { firstname, lastName } = req.body;
      const message = await this.userService.editName(req.userId, firstname, lastName);
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
};
module.exports = UserController;