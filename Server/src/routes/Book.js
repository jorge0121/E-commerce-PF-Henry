const express = require("express");
const bookId = require("../handlers/bookId");
const filteredBooks = require("../handlers/filteredBooks");

const router = express.Router();
const { Books } = require("../db");
const CreateBook = require("../handlers/CreateBook");

router.get("/", async (req, res) => {
  const name = req.query.name;
  if (name) {
    const allBook = await Books.findAll({
      where: {
        title: name
      }
    })
  } else {
    
    try {
      const allBooks = await Books.findAll();
      if (allBooks) {
        res.status(200).json(allBooks);
      } else {
        throw Error("error base de datos");
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
});

router.get("/filter", async (req, res) => {
  const { author, gender, year } = req.query;
  try {
    const filtered = await filteredBooks(author, gender, year);
    res.status(200).json(filtered);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

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

router.post("/", async (req, res) => {
  try {
    const {
      id,
      title,
      author,
      image,
      year,
      price,
      pages,
      active,
      description,
    } = req.body;
    const newBook = await CreateBook({
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
    res.status(200).json(newBook)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

module.exports = router;
