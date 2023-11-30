//importaciones
const express = require("express");
const router = express.Router();
const books = require("./Book");
const routerUser = require("./routerUser");
const routerCommentations = require("./routerCommentations");

//Rutas -----------------------------------------------------------------------------------------------------------------------

router.use("/book", books);
router.use("/user", routerUser);
router.use("/comment", routerCommentations);

module.exports = router;
