const express = require("express");

const server = express()

server.listen(3001, () => {
    console.log("Server listening on port 3001")
})