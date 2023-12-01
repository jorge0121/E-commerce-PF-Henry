const { Users } = require("../db");

const userClient = async (id) => {
  try {
    const user = await Users.findByPk(id, {
      attributes: ["id", "admin"],
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = userClient;
