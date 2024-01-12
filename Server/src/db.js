require("dotenv").config();

//importaciones
const ModelsBook = require("./models/Books");
const ModelsUsers = require("./models/Users");
const ModelsComments = require("./models/Commentations");

//Llamado a las variables de entorno
const { USER, PASSWORD, HOST, PORT, BDD } = process.env;
const { Sequelize } = require("sequelize");

// Conexion
const database = new Sequelize(`postgresql://postgres:FaB-A3GB3G3f-3Cf-D43-ccccF1*EggA@monorail.proxy.rlwy.net:30475/railway`,
  { logging: false,
    native: false, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Solo si estás usando una base de datos que no tiene un certificado válido
    },
  },
  }
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
