const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { AppError } = require("../middlewares/errors/index");

const generateToken = async (user) => {
  const { employeeNumber } = user;
  const employee = await Employee.findOne({ where: { employeeNumber } });
  const { jobTitle, officeCode } = employee;
  const payload = {
    employeeNumber,
    jobTitle,
    officeCode,
    iat: moment().unix(),
    expiresIn: 60 * 60,
  };
  const secret = process.env.SECRET_KEY;
  return jwt.sign(payload, secret);
};
const register = async (body) => {
  const { username, password, employeeNumber } = body;
  const user = await getUserByUsername(username);
  if (!user) {
    const SALT = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, SALT);
    const newUser = await User.create({
      username,
      password: passwordHash,
      employeeNumber,
    });
    return newUser;
  }
  throw new AppError("Username does exist", 400);
};

const login = async (body) => {
  const { username, password } = body;
  const user = await getUserByUsername(username);
  if (!user) {
    throw new AppError("Username or Password is incorrect", 400);
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = generateToken(user);
    return token;
  }
  throw new AppError("Username or Password is incorrect", 400);
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findOne({ where: { userId } });
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({});
  return users;
};

module.exports = {
  generateToken,
  register,
  login,
  getUserByUsername,
  getUserById,
  getAllUsers,
};
