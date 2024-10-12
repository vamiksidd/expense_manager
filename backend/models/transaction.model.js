import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["saving", "expense", "investment"],
            required: true,
        },
        paymentType: {
            type: String,
            enum: ["card", "cash"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            default: "unknown",
        },
        date: {
            type: Date,
        },
    },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction 