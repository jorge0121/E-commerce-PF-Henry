const express = require("express");
const {database } = require("./src/db")
const server = require("./src/server")


database.sync({ force: true}).then(() => {
    server.listen(49375, () => {
      console.log("Server listening on port 49375");
    })
    }).catch(error => console.error(error))
    


