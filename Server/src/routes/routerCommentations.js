const { Router } = require("express");
const commentCreated = require("../handlers/commentCreated");

const routerCommentations = Router();

routerCommentations.post("/", async (req, res) => {
  try {
    const { commentation } = req.body;
    const { bookId, userId } = req.query;
    const newComment = await commentCreated(commentation, bookId, userId);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = routerCommentations;
