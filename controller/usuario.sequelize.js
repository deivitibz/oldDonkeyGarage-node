const {sequelize, Model, DataTypes} = require("../sequelize");

const User = sequelize.define(
  "usuarios",
  {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.ENUM("Admin", "Usuario", "Constructor"),
  },
  {
    timestamps: false,
  }
);

module.exports = {User};
