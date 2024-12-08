import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTokens.js";

// Register Controller
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password || typeof password !== "string") {
            return res.status(400).json({
                success: false,
                message: "All fields are required and must be valid strings",
            });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Error in register controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
            error: error.message,
        });
    }
};


// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Verify the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Generate and send a token
        generateToken(res, user, `Welcome back ${user.name}`);

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
            error: error.message,
        });
    }
};
