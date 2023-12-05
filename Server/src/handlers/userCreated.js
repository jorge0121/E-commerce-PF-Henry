const { Users } = require("../db");

const userCreated = async ({ id, name, email, admin, idBooks }) => {
  try {
    const newUser = await Users.create({ id, name, email, admin, idBooks });
    return newUser;
  } catch (error) {
    throw error;
  }
};
module.exports = userCreated;
