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
  `postgresql://postgres:1-ddDgB533*fDA*e35dF-gbaGe33DGcA@viaduct.proxy.rlwy.net:59694/railway`,
  { logging: false }
);

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
