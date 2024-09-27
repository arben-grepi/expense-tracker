const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });

const transactions = require("./routes/transactions");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello"));

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.bold
  )
);
