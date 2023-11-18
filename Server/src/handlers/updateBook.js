const { Book } = require("../db");

const updateBook = async (id, book) => {
  try {
    const updateBook = await Book.findByPk(id);
    updateBook.set(book);
    const bookUpdated = await updateBook.save();
    return bookUpdated;
  } catch (error) {
    throw error;
  }
};

module.exports = updateBook;
