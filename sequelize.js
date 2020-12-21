const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
  "mariadb://donkey:olddonkeygarage@mypanel.sytes.net:3306/olddonkeygarage"
);

const connect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("ok");
    })
    .catch((err) => {
      console.log(err);
    });
};

const dbSync = async () => {
  await sequelize.sync({force: false});
};

module.exports = {connect, sequelize, Model, DataTypes};
