const { Books } = require("../db");
const { Op } = require("sequelize");

const filteredBooks = async (author, gender, year) => {
  const bookParams = {};
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
    const books = await Books.findAll({ where: bookParams });
    const filteredBooks = books.map((book) => book.dataValues);
    return filteredBooks;
  } catch (error) {
    throw error;
  }
};

module.exports = filteredBooks;
