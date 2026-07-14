import Blogmodel from "../models/blog.model.js";
import CommentModel from "../models/comments.model.js";
import UserModel from "../models/user.model.js";
import fs from 'fs';
import path from 'path';

const Getalldata=async(req,res) => {
    try {
        const Users = await UserModel.find();
        const posts = await Blogmodel.find();
        const Comments = await CommentModel.find();
        

        if (!Users && !posts && !Comments){
            return res.status(404).json({success:false, message: "No data found"})
        }

        res.status(200).json({success:true, Users, posts, comments:Comments});

    } catch (error) {
        return res.status(500).json({success:true, messsage:"Internal Server erroe", error:error.message});
    }
}

const GetUSers= async(req,res)=>{
    try {
        const Users = await UserModel.find();

        if (!Users ){
            return res.status(404).json({success:false, message: "No data found"})
        }

        res.status(200).json({success:true, Users});

        
    } catch (error) {
        return res.status(500).json({success:true, messsage:"Internal Server erroe", error:error.message});
    }
}

const Userdelete=async(req,res)=>{
    try {
        const userId=req.params.id;
        const ExistUser= await UserModel.findById(userId)
        if (!ExistUser){
            return res.status(404).json({success:false, message:"No User Found"})
        }

        if (ExistUser.role=='admin') {
            return res.status(404).json({success:false, message:"Admin Account Can't be Deleted"})
        }

        if(ExistUser.profile){
            const profilePath=path.join('public/images', ExistUser.profile);
            fs.promises.unlink(profilePath)
                .then(()=> console.log('Profile image deleted'))
                .catch(err => console.error('Error deleting Profile image:', err));
        }

        const DeleteUser = await UserModel.findByIdAndDelete(userId);
        const deletecomment = await CommentModel.deleteMany({userId: userId})
        return res.status(200).json({success:true, message:"User Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({success:false, message:"Internal server error", error:error.message})
    }
}


export {Getalldata, GetUSers, Userdelete};