import CommentModel from "../models/comments.model.js"
import Blogmodel from "../models/blog.model.js";

const AddComment=async(req, res)=> {
    try {
        const { postId, userId, comment } = req.body;
        const newComment = new CommentModel({
            postId, userId, comment
        })

        await newComment.save();

        const blogPost= await Blogmodel.findById(postId);
        if(!blogPost) {
            return res.status(404).json({success: true, message:"Blog not found"});
        }

        blogPost.comments.push(newComment._id);
        await blogPost.save();

        res.status(201).json({success:true, message:"Comment added successfully", comment: newComment});

    } catch (error) {
        res.status(500).json({ success:false, message:"Internal Server error", error:error.message})
    }
}

export default AddComment