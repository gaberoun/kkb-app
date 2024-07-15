import Payment from "../models/Payment.js";
import Transaction from "../models/Transaction.js";

// GET /api/v1/payments | Get all payments of a user
const getPaymentsByUser = async (req, res) => {
  const { userId } = req.body;

  try {
    // Payments where the current user is the debtor (owes money to others)
    const directPayments = await Payment.find({ user: userId })
      .populate({
        path: "transaction",
        populate: {
          path: "payor",
          model: "User",
          select: "firstName",
        },
        select: "-__v",
      })
      .populate({
        path: "user",
        model: "User",
        select: "firstName",
      })
      .exec();

    // Payments where the current user is the payor (others owe money to the user)
    const paymentsAsPayor = await Payment.find()
      .populate({
        path: "transaction",
        match: { payor: userId },
        populate: {
          path: "payor",
          model: "User",
          select: "firstName",
        },
        select: "-__v",
      })
      .populate({
        path: "user",
        model: "User",
        select: "firstName",
      })
      .exec();

    // Filter out payments where the transaction is null
    const filteredPaymentsAsPayor = paymentsAsPayor.filter(
      (payment) => payment.transaction
    );

    const combinedPayments = [...directPayments, ...filteredPaymentsAsPayor];

    res.status(200).json({
      message: "List of all payments for this user.",
      data: combinedPayments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve payments: ${error.message}` });
  }
};

// POST /api/v1/payments | Create a new payment
const createPayment = async (req, res) => {
  const { user, transaction, amountOwed } = req.body;

  try {
    const transactionWithUserAsPayor = await Transaction.findOne({
      _id: transaction,
      payor: user,
    });

    if (transactionWithUserAsPayor) {
      return res.status(400).json({ error: "User must not be the payor." });
    }

    const newPayment = new Payment({
      user,
      transaction,
      amountOwed,
      status: "Pending",
    });

    await newPayment.save();

    res.status(201).json({
      message: "New payment created.",
      data: newPayment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create payment: ${error.message}` });
  }
};

// PUT /api/v1/payments/:paymentID | Update payment status
const updatePayment = async (req, res) => {
  const { userId, transactionId, status } = req.body;
  const { paymentId } = req.params;

  try {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      payor: userId,
    });

    if (!transaction) {
      return res.status(400).json({
        error:
          "Insufficient privileges. You have to be the creator of the transaction to update the payment status.",
      });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status: status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "No payment found." });
    }

    res.status(200).json({
      message: "Payment status updated successfully",
      data: payment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update payment: ${error.message}` });
  }
};

// GET /api/v1/payments/:paymentID | Get payment details and transaction details (by transactionId)
const getPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId)
      .populate([
        {
          path: "transaction",
          model: "Transaction",
          populate: [
            {
              path: "groupId",
              model: "Group",
              select: { name: 1 },
            },
            {
              path: "payor",
              model: "User",
              select: { firstName: 1, lastName: 1, email: 1, phone: 1 },
            },
          ],
        },
        {
          path: "user",
          model: "User",
          select: { firstName: 1, lastName: 1, email: 1, phone: 1 },
        },
      ])
      .lean();

    if (!payment) {
      return res.status(404).json({ error: "Payment not found." });
    }

    res.status(200).json({
      message: "Payment details",
      data: payment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to get payment details: ${error.message}` });
  }
};

// DELETE /api/v1/payments/:paymentID | Delete an approved payment.
const deletePayment = async (req, res) => {
  const { userId } = req.body;
  const { paymentId } = req.params;

  try {
    const approvedPayment = await Payment.findOne({
      _id: paymentId,
      user: userId,
      status: "Approved",
    });

    if (!approvedPayment) {
      return res.status(404).json({ error: "No approved payment found." });
    }

    await Payment.findByIdAndDelete(paymentId);
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete payment: ${error.message}` });
  }
};

export {
  getPaymentsByUser,
  createPayment,
  updatePayment,
  getPayment,
  deletePayment,
};
