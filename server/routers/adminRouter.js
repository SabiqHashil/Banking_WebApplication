import { Router } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
    const existingUser = await Admin.findOne({ phoneNo: phoneNo });
    if (existingUser) {
      return res
        .status(400) //* bad request
        .json({
          message: "Admin already exists",
          success: false,
        });
    }
    //* create user
    //*        -> password hash
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    //*     -> User.create()
    await Admin.create({
      name: name,
      phoneNo: phoneNo,
      password: hashPassword,
    });
  
    //* response
    res
      .status(201) //* created
      .json({
        message: "Admin registered successfully",
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
    const admin = await Admin.findOne({ phoneNo: phoneNo });
    if (!admin) {
      return res
        .status(400) //* bad request
        .json({
          message: "Admin not found",
          success: false,
        });
    }
    //* check password
    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res
        .status(400) //* bad request
        .json({
          message: "Invalid credentials",
          success: false,
        });
    }
    //* create token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
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
        message: "Admin logged in successfully",
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

router.get("/users", async (req, res) => {
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
    const admin = await Admin.findOne({ _id: decoded.id });

    if (!admin) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const users = await User.find({})
    .select("-password -__v")
    .sort({ updateAt: -1 })
    .populate("account");

    return res.status(200).json({
      success: true,
      user: users,
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
        message: "Admin is verified",
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
