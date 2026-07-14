
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const isAdmin=async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized: No token provided"});
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        const user=await UserModel.findById(decoded.userID);
        
        if (!user) {
            return res.status(403).json({ success: false, message: "Unauthorized: User not Found" });
        }
        if (user.role != 'admin') {
            return res.status(403).json({ success: false, message: "Unauthorized: User is not admin"})
        }
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal Server error"})
        
    }
}

export {isAdmin}