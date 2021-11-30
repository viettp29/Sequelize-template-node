const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/database");
const Employee = require("./employee.model");

class Customer extends Model {}

Customer.init(
  {
    // Model attributes are defined here
    customerNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    customerName: {
      type: Sequelize.STRING(50),
      required: true,
    },
    contactLastName: {
      type: Sequelize.STRING(50),
      required: true,
    },
    contactFirstName: {
      type: Sequelize.STRING(50),
      required: true,
    },
    phone: {
      type: Sequelize.STRING(50),
      required: true,
      unique: true,
    },
    addressLine1: {
      type: Sequelize.STRING(128),
    },
    addressLine2: {
      type: Sequelize.STRING(128),
    },
    city: {
      type: Sequelize.STRING(50),
    },
    state: {
      type: Sequelize.STRING(50),
    },
    postalCode: {
      type: Sequelize.STRING(25),
    },
    country: {
      type: Sequelize.STRING(50),
    },
    salesRepEmployeeNumber: {
      type: Sequelize.INTEGER,
    },
    creditLimit: {
      type: Sequelize.INTEGER,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "customer", // We need to choose the model name
  }
);
// Customer.belongsTo(Employee, {
//   foreignKey: "salesRepEmployeeNumber",
// });

module.exports = Customer;
