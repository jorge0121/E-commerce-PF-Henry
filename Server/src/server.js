//importaciones
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
//-----------------------------------------------------------------------------------------------------------------------------
const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Rutas ----------------------------------------------------------------------------------------------------------------------
server.use(router);

module.exports = server;
