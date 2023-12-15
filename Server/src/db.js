require("dotenv").config();

//importaciones
const ModelsBook = require("./models/Books");
const ModelsUsers = require("./models/Users");
const ModelsComments = require("./models/Commentations");

//Llamado a las variables de entorno
const { USER, PASSWORD, HOST, PORT, BDD } = process.env;
const { Sequelize } = require("sequelize");

// Conexion
const database = new Sequelize(
  `postgres://db_e_commerce_8ezv_user:mGIyTlONZ8LGmAbkxouDZLf7Erwpt9Xm@dpg-clu5q9a1hbls73ea8nk0-a/db_e_commerce_8ezv`,
  { logging: false }
);

//postgresql://postgres:-3EADg6-f3Df1g*bFDb4BC*23GeDbBag@viaduct.proxy.rlwy.net:49375/railway
ModelsBook(database);
ModelsUsers(database);
ModelsComments(database);

//relaciones de base de datos
const { Books, Users, Commentations } = database.models;

Books.belongsToMany(Users, { through: "Book-Users" });
Users.belongsToMany(Books, { through: "Book-Users" });

Books.hasMany(Commentations);
Commentations.belongsTo(Books);

Users.hasMany(Commentations);
Commentations.belongsTo(Users);

module.exports = {
  database,
  ...database.models,
};
