const logger = require("./logger");

const requestLogger = (Request, Response, next) => {
  logger.info("Method: ", Request.method);
  logger.info("Path: ", Request.path);
  logger.info("Body: ", Request.body);
  logger.info("-----------------------");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown Endpoint",
  });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "castError") {
    return response.status(400).send({
      error: "malformed id",
    });
  } else if (error.name === "validationError") {
    return response.status(400).json({
      error: error.message,
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
