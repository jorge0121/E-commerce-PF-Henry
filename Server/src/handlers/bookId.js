const { Books, Users, Commentations } = require("../db");

const bookId = async (id) => {
  try {
    const idBook = await Books.findByPk(id, {
      include: [
        {
          model: Commentations,
          include: [
            {
              model: Users,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return idBook;
  } catch (error) {
    throw error;
  }
};

module.exports = bookId;
