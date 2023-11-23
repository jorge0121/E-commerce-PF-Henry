const { Books } = require("../db");
const { Op } = require("sequelize");

const filteredBooks = async (author, gender, year, page) => {
  const bookParams = {};
  const itemByPage = 4;
  const offset = (page - 1) * itemByPage;

  try {
    if (author) {
      const authorOk = author.trim();
      bookParams.author = {
        [Op.iLike]: `%${authorOk}%`,
      };
    }
    if (gender) {
      const genderOk = gender.trim();
      bookParams.gender = genderOk;
    }
    if (year) {
      const yearOk = year.trim();
      bookParams.year = yearOk;
    }
    const { count, rows } = await Books.findAndCountAll({
      where: bookParams,
      limit: itemByPage,
      offset,
    });

    const filteredBooks = rows.map((book) => book.dataValues);
    return { filteredBooks, count };
  } catch (error) {
    throw error;
  }
};

module.exports = filteredBooks;
