const { createLogger, format, transports } = require("winston");

const anotherLogger = createLogger({
  // định dạng
  format: format.combine(
    format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.printf(
      (info) => `${[info.timestamp]}: ${info.level}: ${info.message}`
    )
  ),
  // transports
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.timestamp({
          format: "MMM-DD-YYYY HH:mm:ss",
        }),
        format.colorize(),
        format.simple(),
        format.printf(
          (info) => `${[info.timestamp]}: ${info.level}: ${info.message}`
        )
      ),
      timestamp: true,
    }),
    new transports.File({ filename: "info.log", level: "info" }),
    new transports.File({ filename: "warn.log", level: "warn" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

module.exports = {
  anotherLogger,
};
