import bcrypt from "bcryptjs";
import {db} from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required" })
    }

    try {
        const exisitinguser = await db.user.findUnique({ where: { email } })
        if(exisitinguser) {
            return res.status(400).json({success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.USER
            }
        })

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRTY
        })

        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 24 * 60 * 60 * 1000
        }

        res.cookie("jwt", token , cookieOptions)

        return res.status(201).json({success: true, message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image
            }
         })
    } catch (error) {
        return res.status(500).json({success: false, message: "Something went wrong" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).json({success: false, message: "All fields are required" })
    }
    try {
        const user = await db.user.findUnique({ where: { email } })
        if(!user) {
            return res.status(400).json({success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials" })
        }

         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRTY
        })

        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 24 * 60 * 60 * 1000
        }

        res.cookie("jwt", token , cookieOptions)

        return res.status(201).json({success: true, message: "User Login successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image
            }
         })

        
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({success: false, message: "Something went wrong" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt" , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error:"Error logging out user"
        })
    }
}

export const check = async (req, res) => {
    try {
        return res.status(200).json({success: true, message: "User authenticated in successfully", user: req.user})
    } catch (error) {
         return res.status(500).json({success: false, message: "Something went wrong" })
    }
}