const Customer = require("../models/customer.model");
const sequelize = require("../config/database");
const { Error } = require("../middlewares/errors/index");

const createCustomer = async (body) => {
  const findCustomer = await Customer.findOne({
    where: { phone: body.phone },
  });
  if (!findCustomer) {
    const customer = await Customer.create(body);
    return customer;
  } else {
    throw new Error("customer does exist");
  }
};

const getAllCustomers = async () => {
  const customer = await Customer.findAll({});
  return customer;
};

const getCustomer = async (id) => {
  const customer = await Customer.findOne({
    where: { customerNumber: id },
  });
  if (customer) {
    return customer;
  }
  throw new Error("customer does not exist", 404);
};

const updateCustomer = async (body) => {
  const {
    customerNumber,
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  } = body;
  const customer = await Customer.findOne({
    where: { customerNumber },
  });
  if (!customer) {
    throw new Error("customer does not exist", 404);
  }
  await sequelize.transaction(async (transaction) => {
    await Customer.update(
      {
        customerName,
        contactLastName,
        contactFirstName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      },
      { where: { customerNumber }, transaction }
    );
  });
};

const deleteCustomer = async (customerNumber) => {
  const customer = await Customer.findOne({ where: { customerNumber } });
  if (!customer) {
    throw new Error("customer does not exist", 404);
  }
  await Customer.destroy({ where: { customerNumber } });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
