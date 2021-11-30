const Employee = require("../models/employee.model");
const sequelize = require("../config/database");
const { AppError } = require("../middlewares/errors/index");
const { logger } = require("../services/logger");
const createEmployee = async (body) => {
  const findEmployee = await Employee.findOne({
    where: { email: body.email },
  });
  if (!findEmployee) {
    const employee = await Employee.create(body);
    return employee;
  } else {
    throw new AppError("employee does exist", 400);
  }
};

const getAllEmployees = async () => {
  const employee = await Employee.findAll({});
  return employee;
};

const getEmployee = async (id) => {
  const employee = await Employee.findOne({
    where: { employeeNumber: id },
  }).catch((error) => logger.error("ERROR /getEmployee", error));
  if (employee) {
    return employee;
  }
  throw new AppError("employee does not exist", 404);
};

const updateEmployee = async (body) => {
  const {
    employeeNumber,
    firstName,
    lastName,
    extension,
    email,
    officeCode,
    reportsTo,
    jobTitle,
  } = body;
  const employee = await Employee.findOne({
    where: { employeeNumber },
  });
  if (!employee) {
    throw new AppError("employee does not exist", 404);
  }
  await sequelize.transaction(async (transaction) => {
    await Employee.update(
      {
        firstName,
        lastName,
        extension,
        email,
        officeCode,
        reportsTo,
        jobTitle,
      },
      { where: { employeeNumber }, transaction }
    );
  });
};

const deleteEmployee = async (employeeNumber) => {
  const employee = await Employee.findOne({ where: { employeeNumber } });
  if (!employee) {
    throw new AppError("employee does not exist", 404);
  }
  await Employee.destroy({ where: { employeeNumber } });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
