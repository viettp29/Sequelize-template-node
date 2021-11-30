const sequelize = require("../config/database");
const Sequelize = require("sequelize");
// const db = require("../models");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customer = require("./customer.model.js");
db.Employee = require("./employee.model.js");
db.User = require("./user.model.js");
//employee
db.Employee.belongsTo(db.Employee, {
  foreignKey: "reportsTo",
});
db.Employee.hasOne(db.User, {
  foreignKey: "employeeNumber",
});
db.Employee.hasMany(db.Customer, {
  foreignKey: "salesRepEmployeeNumber",
});
//user
db.User.belongsTo(db.Employee, {
  foreignKey: "employeeNumber",
});
//customer
db.Customer.belongsTo(db.Employee, {
  foreignKey: "salesRepEmployeeNumber",
});

db.sequelize
  .sync({ force: true, alter: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.message);
  });
