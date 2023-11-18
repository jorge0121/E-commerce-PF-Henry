const { Book } = require("../db");

const bookId = async id => {
  try {
    const idBook = await Book.findByPk(id);
    return idBook;
  } catch (error) {
    throw error;
  }
};

module.exports = bookId;
