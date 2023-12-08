//importaciones
const express = require("express");
const router = express.Router();
const books = require("./Book");
const routerUser = require("./routerUser");
const routerCommentations = require("./routerCommentations");
const checkout = require('./CheckOut')

//Rutas -----------------------------------------------------------------------------------------------------------------------

router.use("/book", books);
router.use("/user", routerUser);
router.use("/comment", routerCommentations);
router.use('/checkout', checkout);
module.exports = router;
