const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const env = {
  db_name: process.env.DB_NAME || "manage_API",
  db_user: process.env.DB_USER || "root",
  db_password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "localhost",
};

console.log(env);

const sequelize = new Sequelize(env.db_name, env.db_user, env.db_password, {
  dialect: "mysql",
  logging: console.log,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối DB thành công!");
  } catch (err) {
    throw new Error(err);
  }
})();

module.exports = sequelize;
