const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/database");
class Employee extends Model {}

Employee.init(
  {
    employeeNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING(50),
      required: true,
    },
    lastName: {
      type: Sequelize.STRING(50),
      required: true,
    },
    extension: {
      type: Sequelize.STRING(50),
    },
    email: {
      type: Sequelize.STRING(50),
      unique: true,
      required: true,
    },
    officeCode: {
      type: Sequelize.STRING(50),
      required: true,
    },
    reportsTo: {
      type: Sequelize.INTEGER,
    },
    jobTitle: {
      type: Sequelize.STRING(128),
    },
  },
  {
    sequelize,
    modelName: "employee",
  }
);

// Employee.belongsTo(Employee, {
//   foreignKey: "reportsTo",
// });
// Employee.hasMany(Customer, {
//   foreignKey: "salesRepEmployeeNumber",
// });

module.exports = Employee;
