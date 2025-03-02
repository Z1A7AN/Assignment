import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    score: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);