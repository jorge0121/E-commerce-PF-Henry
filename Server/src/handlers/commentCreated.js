const { Books, Commentations, Users } = require("../db");

const commentCreated = async (commentation, bookId, userId) => {
  try {
    const book = await Books.findByPk(bookId);
    if (book) {
      const newComment = await Commentations.create({
        commentation,
        BookId: bookId,
        UserId: userId,
      });
      return newComment;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = commentCreated;
