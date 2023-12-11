const express = require('express');
const  createSession  = require ('./CheckOut/CreateSession');
const router = express.Router();


router.post("/session", createSession);
router.get("/success",(req, res) => res.send("Success"));
router.get("/cancel", (req, res) => res.send("cancel "))

module.exports = router;