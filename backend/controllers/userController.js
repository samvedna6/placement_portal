const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.college = req.body.college || user.college;
      user.branch = req.body.branch || user.branch;
      user.cgpa = req.body.cgpa || user.cgpa;
      user.phone = req.body.phone || user.phone;
      user.skills = req.body.skills || user.skills;
      user.resume = req.body.resume || user.resume;

      const updatedUser = await user.save();

      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};