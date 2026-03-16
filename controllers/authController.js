// authController.js file ---------------------------------------------------------

// controller handling athentication login
// includes user registeration, Login and JWT token generation

import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// Register User

export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User is already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user),
            user
        });
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }

}



// Login User 


export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        console.log(req.body);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successfully",
            token: generateToken(user),

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
