require("dotenv").config();
const express = require("express");
require("./config/database");
const { errors } = require("celebrate");
const app = express();
const logger = require("morgan");
const { handleErrors } = require("./middlewares/errors/index.js");
const { anotherLogger } = require("./services/logger");
const fs = require("fs");
const YAML = require("yamljs");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};
// ghi file logs.log
app.use(
  logger("tiny", {
    stream: fs.createWriteStream("./logs.log", { flags: "a" }),
  })
);
app.use(logger("dev"));
const swaggerYAML = YAML.load("./swagger.yaml");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use( "/api/docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerSpec)); // inline comments
app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerYAML) // using YAML
);

// app.use( "/api/docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerJSON)); // using JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const indexRouter = require("./routers/index.router");
const employee = require("./routers/employee.router");
const customer = require("./routers/customer.router");
const users = require("./routers/user.router");

app.use("/api/", indexRouter);
app.use("/api/employees", employee);
app.use("/api/customers", customer);
app.use("/api/users", users);
// handle all error not found
app.all("*", (req, res) => {
  return res.status(404).send({
    status: "error",
    message: `${req.originalUrl} not found.`,
  });
});

const port = process.env.PORT;

app.get("/", (req, res) => res.send("HELLO"));

//  return error validation
app.use(errors());

//  handle errors no async
app.use(handleErrors);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
