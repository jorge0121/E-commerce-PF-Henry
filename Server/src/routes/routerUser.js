const { Router } = require("express");
const users = require("../handlers/users");
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

routerUser.post("/", async (req, res) => {
  try {
    const { id, name, email } = req.body;
    console.log('id', id)

    const newUser = await userCreated({ id, name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerUser.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userUpdated = await updatedUser(id, user);
    res.status(201).json(userUpdated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = routerUser;
