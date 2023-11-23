const { Books } = require("../db");

const sortB = async (value, organization, page) => {
  const itemByPage = 4;
  const offset = (page - 1) * itemByPage;
  try {
    const { count, rows } = await Books.findAndCountAll({
      order: [[value, organization]],
      limit: itemByPage,
      offset,
    });
    return { count, rows };
  } catch (error) {
    throw error;
  }
};

module.exports = sortB;
