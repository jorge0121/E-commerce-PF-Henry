const { Users } = require("../db");

const updatedUser = async (user, userId) => {
  try {
    const updatedUser = await Users.findByPk(userId);
    updatedUser.set(user);
    const UserUpdated = await updatedUser.save();
    return UserUpdated;
  } catch (error) {
    throw error;
  }
};

module.exports = updatedUser;
