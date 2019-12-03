import winston from "winston";

export default winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});
