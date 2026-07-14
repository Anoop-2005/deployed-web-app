import Blogmodel from "../models/blog.model.js";


const Getsinglepost=async(req, res)=> {
    try {
        const postId=req.params.id
        const Post= await Blogmodel.findById(postId)
        .populate({
            path:"comments",
            populate:{
                path:"userId"
            }
        })

        if (!Post) {
            return res.status(404).json({success: false, message:"Blog Post not found"});
        }
        res.status(200).json({success:true, Post})
    } catch (error) {
        return res.status(500).json({success:false, message: "Internal Server error", error:error.message})
        
    }
}

export {Getsinglepost};