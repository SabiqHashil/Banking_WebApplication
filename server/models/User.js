import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    phoneNo: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
});

const User = mongoose.model("User", userSchema);

export default User;