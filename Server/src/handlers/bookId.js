const { Books } = require("../db");

const bookId = async id => {
  try {
    const idBook = await Books.findByPk(id);
    return idBook;
  } catch (error) {
    throw error;
  }
};

module.exports = bookId;
