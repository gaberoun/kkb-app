import Transaction from "../models/Transaction.js";
import Payment from "../models/Payment.js";

// POST /api/v1/transactions | Create a new transaction in a group
const createTransaction = async (req, res) => {
  const { groupId, description, category, userId, totalAmount } = req.body;

  try {
    // Input Validator
    if (!/^.{1,60}$/.test(description)) {
      return res
        .status(400)
        .json({ error: "Description must be between 1 and 60 characters" });
    }

    if (category === "") {
      return res
        .status(400)
        .json({ error: "Select a category" });
    }

    if (totalAmount === 0) {
      return res
        .status(400)
        .json({ error: "Total should not be zero" });
    }

    const newTransaction = new Transaction({
      groupId,
      description,
      category,
      payor: userId,
      totalAmount,
    });

    await newTransaction.save();

    res.status(201).json({
      message: "New transaction created.",
      data: newTransaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create transaction: ${error.message}` });
  }
};

// GET /api/v1/transactions/:transactionID | Get transaction details and payments (by transactionId).
const getTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found!" });
    }

    const payments = await Payment.find({ transaction: transactionId })
      .lean()
      .populate("user", "firstName lastName");

    res.status(200).json({
      message: "Transaction details",
      data: {
        transaction,
        payments,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to get transaction details: ${error.message}` });
  }
};

// DELETE /api/v1/transactions/:transactionID | Delete a transaction (Payor only).
const deleteTransaction = async (req, res) => {
  const { userId } = req.body;
  const { transactionId } = req.params;

  try {
    const transactionToDelete = await Transaction.findOneAndDelete({
      _id: transactionId,
      payor: userId,
    });

    if (!transactionToDelete) {
      return res.status(404).json({ error: "Transaction not found!" });
    }

    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete transaction: ${error.message}` });
  }
};

export { createTransaction, getTransaction, deleteTransaction };
