import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID field is required."],
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: [true, "Transaction ID field is required."],
    },
    amountOwed: {
      type: Number,
      required: [true, "Amount Owed field is required."],
    },
    status: {
      type: String,
      required: [true, "Status field is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);
export default Payment;
