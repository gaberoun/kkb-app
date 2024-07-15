import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: [true, "Group ID field is required."],
    },
    description: {
      type: String,
      required: [true, "Transaction description field is required."],
    },
    category: {
      type: String,
      required: [true, "Category field is required."],
    },
    payor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Payor ID field is required."],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total Amount field is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
