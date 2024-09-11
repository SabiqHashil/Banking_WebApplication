import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["credit", "debit"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    balance: {
      //* After transaction
      type: Number,
      required: [true, "Balance is required"],
    },
  },
  { timestamps: true }
);

const accountSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      required: [true, "Balance is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accountNo: {
      type: String,
      required: [true, "Account number is required"],
      unique: true,
    },
    transactionHistory: [transactionSchema],
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
