const { Router } = require("express");
const users = require("../handlers/users");
const userClient = require("../handlers/userClient");
const userCreated = require("../handlers/userCreated");
const updatedUser = require("../handlers/updatedUser");

const routerUser = Router();

routerUser.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const user = await users(page);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerUser.get("/client", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await userClient(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerUser.post("/", async (req, res) => {
  try {
    const { id, name, email, admin, idBooks } = req.body;

    const newUser = await userCreated({ id, name, email, admin, idBooks });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerUser.put("/update", async (req, res) => {
  try {
    const { userId } = req.query;
    const user = req.body;
    console.log("user", user);
    if (userId) {
      const userUpdated = await updatedUser(user, userId);
      res.status(201).json(userUpdated);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = routerUser;
