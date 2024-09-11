import { Router } from "express";
import Account from "../models/Account.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = Router();

//* add money -> POST
router.post("/add-money", async (req, res) => {
  try {
    const { amount } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        message: "unauthorized",
        success: false,
      });
    }

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //* find user
    const user = await User.findOne({ _id: decoded.id });
    //* find account
    const account = await Account.findOne({ _id: user.account });
    if (!account) {
      return res.status(400).json({
        message: "Account not found",
        success: false,
      });
    }

    account.balance += amount;

    //* transaction
    const newTransaction = {
      type: "credit",
      amount,
      balance: account.balance,
    };
    account.transactionHistory.push(newTransaction);

    //* save account
    await account.save();

    return res.status(200).json({
      message: "Amount added successfully",
      success: true,
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

//* widthdraw money -> POST
router.post("/withdraw-money", async (req, res) => {
  try {
    const { amount } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        message: "unauthorized",
        success: false,
      });
    }

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //* find user
    const user = await User.findOne({ _id: decoded.id });
    //* find account
    const account = await Account.findOne({ _id: user.account });
    if (!account) {
      return res.status(400).json({
        message: "Account not found",
        success: false,
      });
    }

    //* check if balance is enough
    if (account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
        success: false,
      });
    }

    account.balance -= amount;

    //* transaction
    const newTransaction = {
      type: "debit",
      amount,
      balance: account.balance,
    };
    account.transactionHistory.push(newTransaction);

    //* save account
    await account.save();

    return res.status(200).json({
      message: "Amount withdraw successfully",
      success: true,
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

//* balance -> get
router.get("/balance", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        message: "unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //* find user
    const user = await User.findOne({ _id: decoded.id });
    //* find account
    const account = await Account.findOne({ _id: user.account });
    if (!account) {
      return res.status(400).json({
        message: "Account not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

//* get transactions -> get
router.get("/transcation", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        message: "unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //* find user
    const user = await User.findOne({ _id: decoded.id });
    //* find account
    const account = await Account.findOne({ _id: user.account });
    if (!account) {
      return res.status(400).json({
        message: "Account not found",
        success: false,
      });
    }

    const transactionHistory = account.transactionHistory;
    //* filter transaction in created at
    const sortedTransactions = transactionHistory.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({
      success: true,
      transactions: sortedTransactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

export default router;
