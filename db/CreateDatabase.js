const Transaction = require("../models/Transaction");

// Create 5 expense transaction objects
const transaction1 = new Transaction({
  text: "Grocery Shopping",
  amount: -75.5,
});

const transaction2 = new Transaction({
  text: "Salary",
  amount: 2500,
});

const transaction3 = new Transaction({
  text: "Car Maintenance",
  amount: -300,
});

const transaction4 = new Transaction({
  text: "Freelance Project",
  amount: 500,
});

const transaction5 = new Transaction({
  text: "Dining Out",
  amount: -45.75,
});

const transactions = [
  transaction1,
  transaction2,
  transaction3,
  transaction4,
  transaction5,
];

const createTransactions = async () => {
  try {
    for (let trans of transactions) {
      await trans.save(); // Save the transaction to the database
      console.log(`Transaction "${trans.text}" added successfully!`);
    }
    console.log("All transactions have been added!");
  } catch (error) {
    console.error("Error creating transactions:", error);
  }
};

createTransactions();
