const { Users } = require("../db");

const userClient = async () => {
  try {
    const user = await Users.findAll({
      attributes: ["id", "admin"],
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = userClient;
