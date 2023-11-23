const express = require("express");
const bookId = require("../handlers/bookId");
const updateBook = require("../handlers/updateBook");
const CreateBook = require("../handlers/CreateBook");
const filteredBooks = require("../handlers/filteredBooks");

const router = express.Router();
const { Books } = require("../db");

router.get("/", async (req, res) => {
  //Query-----------------------------------------------------------------------------------------------------------------------
  const name = req.query.name;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  //Busqueda por Nombre -------------------------------------------------------------------------------------------------------
  if (name) {
    const allBook = await Books.findAll({
      where: {
        title: name,
      },
    });
    res.status(200).json(allBook);
  } else {
    // Data Paginada ----------------------------------------------------------------------------------------------------
    try {
      const allBooks = await Books.findAll({
        offset: (page - 1) * limit,
        limit: limit,

        //Ejemplo  localhost:3001/book?page=2
      });
      const totalbook = await Books.count();
      const PaginadoData = {
        allBooks,
        totalbook,
        totalPage: Math.ceil(totalbook / limit),
        currentPage: page,
      };

      res.status(200).json(PaginadoData);

      // throw Error("error base de datos");
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
});
// Fltros ----------------------------------------------------------------------------------------------------
router.get("/filter", async (req, res) => {
  const { author, gender, year } = req.query;
  try {
    const filtered = await filteredBooks(author, gender, year);
    res.status(200).json(filtered);
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
