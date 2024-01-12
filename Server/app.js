const express = require("express");
const {database } = require("./src/db")
const server = require("./src/server")


database.sync({ force: true}).then(() => {
    server.listen(3001, () => {
      console.log("Server listening on port 3001");
    })
    }).catch(error => console.error(error))
    


