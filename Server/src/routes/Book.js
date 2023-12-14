const express = require("express");
const bookId = require("../handlers/bookId");
const updateBook = require("../handlers/updateBook");
const CreateBook = require("../handlers/CreateBook");
const filteredBooks = require("../handlers/filteredBooks");
const sortB = require("../handlers/sortB");
const filtersAutYearGen = require("../handlers/filtersAutYearGen");
const { Op } = require("sequelize");

const router = express.Router();
const { Books } = require("../db");

router.get("/", async (req, res) => {
  //Query-----------------------------------------------------------------------------------------------------------------------
  const name = req.query.name;

  const page = parseInt(req.query.page) || 1;

  //Busqueda por Nombre -------------------------------------------------------------------------------------------------------
  if (name) {
    const allBook = await Books.findAll({
      where: {
        title: {  [Op.iLike || Op.like]: `%${name}%`,},
      },
    });
    res.status(200).json(allBook);
  } else {
    // Data Paginada ----------------------------------------------------------------------------------------------------
    try {
      const itemByPage = 4;
      const offset = (page - 1) * itemByPage;
      const { count, rows } = await Books.findAndCountAll({
        limit: itemByPage,
        offset,
      });

      res.status(200).json({ count, rows });

      // throw Error("error base de datos");
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
});

// Fltros ----------------------------------------------------------------------------------------------------
router.get("/filter", async (req, res) => {
  const { author, gender, year, page } = req.query;
  try {
    const filtered = await filteredBooks(author, gender, year, page);
    res.status(200).json(filtered);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ordenamiento -----------------------------------------------------------------------------------------------
router.get("/booksort", async (req, res) => {
  try {
    const { value, organization, page } = req.query;

    const booksSorts = await sortB(value, organization, page);
    res.status(200).json(booksSorts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//autores,años,generos-----------------------------------------------------------------------------------------
router.get("/author-year-gender", async (req, res) => {
  try {
    const filters = await filtersAutYearGen();
    res.status(200).json(filters);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Details ----------------------------------------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookId(id);
    if (book) {
      res.status(200).json(book);
    } else {
      throw Error("id no encontrado");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// bulk create---------------------------------------------------------------------------------------------------

router.post("/bulke", async (req, res) => {
  try {
    const books = req.body;
    const created = await Books.bulkCreate(books);
    res.status(201).json(created);
  } catch (error) {
    res.status(404).json(error.message);
    console.log("error", error);
  }
});

// Update  ----------------------------------------------------------------------------------------------------
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const book = req.body;
  try {
    const bookUpdated = await updateBook(id, book);
    res.status(201).json(bookUpdated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create ----------------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      gender,
      image,
      year,
      price,
      pages,
      active,
      description,
    } = req.body;
    const newBook = await CreateBook({
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
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
