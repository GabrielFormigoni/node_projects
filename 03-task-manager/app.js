const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());

// routes
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
