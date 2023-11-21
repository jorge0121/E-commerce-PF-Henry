const { Books } = require("../db");

const updateBook = async (id, book) => {
  try {
    const updateBook = await Books.findByPk(id);
    updateBook.set(book);
    const bookUpdated = await updateBook.save();
    return bookUpdated;
  } catch (error) {
    throw error;
  }
};

module.exports = updateBook;
