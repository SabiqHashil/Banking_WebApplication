import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routers/userRouter.js";
import accountRouter from "./routers/accountRouter.js";
import adminRouter from "./routers/adminRouter.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// create app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
// app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// routers
app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/admin", adminRouter);

// server listen
app.listen(8081, async () => {
  await connectDB();
  console.log("Server is running on port 8081");
});
