import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
const User = mongoose.model("User", userSchema)
export default User;