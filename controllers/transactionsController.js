const Transaction = require("../models/Transaction");

//@desc     Get all transactions
//@route    Get /api/v1/transactions
//@access   Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    console.log(err);
    // Use res.status(500) instead of res.send(500)
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

///@desc     Post transaction
//@route    POST /api/v1/transactions
//@access   Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    // Creating a transaction using the model
    const transaction = await Transaction.create(req.body);

    // Send success response with the created transaction
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    // Handling validation errors (Mongoose-specific)
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    // Use res.status(500) instead of res.send(500)
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Delete transaction
//@route    Get /api/v1/transactions
//@access   Public

//@desc     Delete transaction
//@route    DELETE /api/v1/transactions/:id
//@access   Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    // Find and delete the transaction by ID
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    // Send success response with the deleted transaction
    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
