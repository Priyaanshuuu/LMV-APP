import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTokens.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        if (!name || !email || !password || typeof password !== "string") {
            return res.status(400).json({
                success: false,
                message: "All fields are required and must be valid strings",
            });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

    
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


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Generate token and set cookie
        generateToken(res, user);

        // Send success response
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
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Failed to login",
                error: error.message,
            });
        }
    }
};

