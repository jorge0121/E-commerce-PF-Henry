//importaciones
const express = require("express");
const router = express.Router();
const books = require("./Book");

//Rutas -----------------------------------------------------------------------------------------------------------------------

router.use("/book", books);

module.exports = router;
