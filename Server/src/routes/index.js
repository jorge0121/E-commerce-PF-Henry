//importaciones
const express = require("express");
const router = express.Router();
const books = require("./Book");
const routerUser = require("./routerUser");
const routerCommentations = require("./routerCommentations");
const checkout = require("./CheckOut");
const routerSendEmail = require("./routerSendEmail");

//Rutas -----------------------------------------------------------------------------------------------------------------------

router.use("/book", books);
router.use("/user", routerUser);
router.use("/comment", routerCommentations);
router.use("/checkout", checkout);
router.use("/send-email", routerSendEmail);

module.exports = router;
