const { Books } = require("../db");

const CreateBook = async ({
  title,
  author,
  gender,
  image,
  year,
  price,
  pages,
  active,
  description,
}) => {
  const newBook = await Books.create({
    title,
    author,
    gender,
    image,
    year,
    price,
    pages,
    active,
    description,
  });
  return newBook;
};

module.exports = CreateBook;
