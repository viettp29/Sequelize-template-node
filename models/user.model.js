const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/database");
class User extends Model {}

User.init(
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING(45),
      unique: true,
      required: true,
    },
    password: {
      type: Sequelize.STRING(100),
      required: true,
    },
    employeeNumber: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
// User.hasOne(Employee, {
//   foreignKey: "employeeNumber",
// });

module.exports = User;
