import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const isLogin = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({message: "Please Log in first"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userID);

        if (!user){
            return res.status(403).json({message:"Unauthorized user not Found"});
        }

        req.user=user;
        next();

    } catch (error){
        return res.status(401).json({success:false, message:"Internal Server Error"})

    }
};
//used in liking so only authencticated logged in user can like 
export { isLogin };