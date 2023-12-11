const express = require("express");
const postEmail = require("../handlers/postEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userEmail, totalUSD, booksName } = req.query;

    const email = await postEmail(userEmail, totalUSD, booksName);
    if (email) {
      res.status(200).json("Factura enviada con exito");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
