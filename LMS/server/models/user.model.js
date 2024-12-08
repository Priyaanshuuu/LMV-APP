import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure unique email addresses
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["instructor", "student"],
            default: "student",
        },
        enrollCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        photoUrl: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
