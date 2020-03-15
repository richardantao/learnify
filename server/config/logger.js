const winston = require("winston");
const { LoggingWinston } = require("@google-cloud/logging-winston");

const stackDriver = new LoggingWinston;

module.exports = winston.createLogger({
    level: "info",
    transports: [
      new winston.transports.Console(),
      stackDriver
    ]
});
