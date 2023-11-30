const { Users } = require("../db");

const updatedUser = async (id, user, userId) => {
  try {
    const userAdmin = await Users.findByPk(userId);
    if (userAdmin.admin === true) {
      const updatedUser = await Users.findByPk(id);
      updatedUser.set(user);
      const UserUpdated = await updatedUser.save();
      return UserUpdated;
    } else {
      throw new Error("No cuentas con permisos para esta accion");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = updatedUser;
