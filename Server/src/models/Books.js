const { DataTypes } = require("sequelize");
module.exports = (database) => {
  database.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    //   gender: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
      active: {
        type: DataTypes.BOOLEAN,
        // unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
      },

    },
    {
      timestamps: false,
    }
  );
};
