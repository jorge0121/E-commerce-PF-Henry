const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET BOOK");
});

router.get("/:id", (req, res) => {
  res.send("GET BOOK ID");
});

module.exports = router;
