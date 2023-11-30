const { Users } = require("../db");

const users = async (page) => {
  try {
    const itemByPage = 8;
    const offset = (page - 1) * itemByPage;
    const { count, rows } = await Users.findAndCountAll({
      limit: itemByPage,
      offset,
    });
    return { count, rows };
  } catch (error) {
    throw error;
  }
};

module.exports = users;
