const { Books } = require("../db");

const CreateBook = async ({
  id,
  title,
  author,
  image,
  year,
  price,
  pages,
  active,
  description,
}) => {
  const newBook = await Books.create({
    id,
    title,
    author,
    image,
    year,
    price,
    pages,
    active,
    description,
  });
    return newBook
};

module.exports = CreateBook;