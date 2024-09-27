const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/expensetracker")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB: ", err));

module.exports = mongoose;
