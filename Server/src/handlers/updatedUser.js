const { Users } = require("../db");

const updatedUser = async (id, user) => {
  try {
    const updatedUser = await Users.findByPk(id);
    updatedUser.set(user);
    const UserUpdated = await updatedUser.save();
    return UserUpdated;
  } catch (error) {
    throw error;
  }
};

module.exports = updatedUser;
