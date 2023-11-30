const { Users } = require("../db");

const userCreated = async ({ id, name, email }) => {
  try {
    const newUser = await Users.create({ id, name, email });
    return newUser;
  } catch (error) {
    throw error;
  }
};
module.exports = userCreated;
