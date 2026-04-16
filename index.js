const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();
app.use(middleware.requestLogger);
const mongoUrl = `${config.MONGODB_URI}`;
logger.info(config.MONGODB_URI);
logger.info("connecting to", mongoUrl);
mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    logger.info(blogs);
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
