const express = require("express");
const bookId = require("../handlers/bookId");
const router = express.Router();
const { Book } = require("../db");

router.get("/", async(req, res) => {
  try{
      const allBooks = await Book.findAll() 
      if(allBooks){
        res.status(200).json(allBooks);
      } else{
        throw Error("error base de datos")
      }
  }catch(error){
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

module.exports = router;
