const { Users } = require("../db");

const userCreated = async ({ id, name, email, admin }) => {
  try {
    const newUser = await Users.create({ id, name, email, admin });
    return newUser;
  } catch (error) {
    throw error;
  }
};
module.exports = userCreated;
