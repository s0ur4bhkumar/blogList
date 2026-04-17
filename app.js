const express = require("express");
const mongooes = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const app = express();

logger.info("connecting to ", config.MONGODB_URI);

mongooes
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDB: ", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
