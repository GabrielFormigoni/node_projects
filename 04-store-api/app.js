require("dotenv").config();
require("express-async-errors");
const conncetDB = require("./db/connect");

// async errors

// express
const express = require("express");
const app = express();

// import routes
const ProductRouter = require("./routes/products");

// import middlewares
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Produtos<a>');
});

// rota dos produtos
app.use("/api/v1/products", ProductRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // conectando ao banco de dados
    await conncetDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
