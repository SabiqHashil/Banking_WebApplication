import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Account from "../models/Account.js";
import jwt from "jsonwebtoken";
import { randomInt } from "node:crypto";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    //* get data
    //*   -> req.body
    const { name, phoneNo, password } = req.body;
    //* validate data
    //*     -> email, phoneNo, password
    if (!phoneNo || !password || !name) {
      return res
        .status(400) //* bad request
        .json({
          message: "All fields are required",
          success: false,
        });
    }

    //* check if user already exists
    const existingUser = await User.findOne({ phoneNo: phoneNo });
    if (existingUser) {
      return res
        .status(400) //* bad request
        .json({
          message: "User already exists",
          success: false,
        });
    }
    //* create user
    //*        -> password hash
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    //*     -> User.create()
    const newUser = await User.create({
      name: name,
      phoneNo: phoneNo,
      password: hashPassword,
    });
    //TODO: check if account no already exists
    const accountNo = randomInt(1000000000, 9999999999);
    while (true) {
      const existingAccount = await Account.findOne({ accountNo: accountNo });
      if (!existingAccount) {
        break;
      }
      accountNo = randomInt(1000000000, 999999999);
    }

    //*     -> create new account
    const account = await Account.create({
      balance: 0,
      user: newUser._id,
      accountNo: randomInt(1000000000, 9999999999),
    });
    //*     -> link account to user
    newUser.account = account._id;
    //* save
    await newUser.save();

    //* response
    res
      .status(201) //* created
      .json({
        message: "User registered successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500) //* internal server error
      .json({
        message: error.message,
        success: false,
      });
  }
});

router.post("/login", async (req, res) => {
  try {
    //* get data
    const { phoneNo, password } = req.body;
    //* validate data
    if (!phoneNo || !password) {
      return res
        .status(400) //* bad request
        .json({
          message: "All fields are required",
          success: false,
        });
    }
    //* check user exists
    const user = await User.findOne({ phoneNo: phoneNo });
    if (!user) {
      return res
        .status(400) //* bad request
        .json({
          message: "User not found",
          success: false,
        });
    }
    //* check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(400) //* bad request
        .json({
          message: "Invalid credentials",
          success: false,
        });
    }
    //* create token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    console.log(token);
    //* data(_id) , secret key, options
    //* response
    res
      .status(200) //* ok
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "User logged in successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500) //* internal server error
      .json({
        message: error.message,
        success: false,
      });
  }
});

router.get("/", async (req, res) => {
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
    const user = await User.findOne({ _id: decoded.id }).populate("account");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const userData = {
      name: user.name,
      phoneNo: user.phoneNo,
      accountNo: user.account.accountNo,
      balance: user.account.balance,
    }

    const transactionHistory = user.account.transactionHistory;
    //* filter transaction in created at
    const sortedTransactions = transactionHistory.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({
      success: true,
      user: userData,
      transactions: sortedTransactions,
    });

  } catch (error) {
    console.log(error);
    res
      .status(500) //* internal server error
      .json({
        message: error.message,
        success: false,
      });
  }
});

router.get("/verify", async (req, res) => {
  try {
    //* get token
    const token = req.cookies.token;
    //* check if token exists
    if (!token) {
      return res
        .status(401) //* unauthorized
        .json({
          message: "Unauthorized",
          success: false,
        });
    }
    //* verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401) //* unauthorized
        .json({
          message: "Unauthorized",
          success: false,
        });
    }
    //TODO: check if is disabled by admin
    //* response
    res
      .status(200) //* ok
      .json({
        message: "User is verified",
        success: true,
        id: decoded.id,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500) //* internal server error
      .json({
        message: error.message,
        success: false,
      });
  }
});

router.get("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401) //* unauthorized
        .json({
          message: "Unauthorized",
          success: false,
        });
    }

    res.clearCookie("token");

    res
      .status(200) //* ok
      .json({
        message: "User logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500) //* internal server error
      .json({
        message: error.message,
        success: false,
      });
  }
});



export default router;
