import Blogmodel from "../models/blog.model.js";
import { indexBlog, deleteBlogIndex } from "../services/Chat.service.js";
import CommentModel from "../models/comments.model.js";

const Create=async(req, res)=>{
    try{
        const {title, desc} = req.body;
        
        const CreateBlog = new Blogmodel({
            title,
            desc,
          
        })
        await CreateBlog.save() //both can happedn in just by model.create
        indexBlog(CreateBlog);

        return res.status(201).json({success:true, message:'Post created Successfully', post: CreateBlog});

    }catch (error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server error"})

    }
}

const deletePost = async(req, res)=>{
    try {
        const postId=req.params.id;

        const deletedPost = await Blogmodel.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        await CommentModel.deleteMany({ postId: postId });
        deleteBlogIndex(postId);
        

        return res.status(200).json({success: true,message: "Post deleted successfully",});

    } catch (error) {
        return res.status(500).json({success: false,message: "Internal server error",error: error.message,});
    }
};

        

const getposts= async(req,res)=>{
    try {
        const posts= await Blogmodel.find()
        if(!posts) {
            return res.status(404).json({success:false, message:"Post Not Found"})
        }
        return res.status(200).json({sucess:true, posts})
    } catch (error) {
        res.status(500).json({success:true, message:"Internal server error", error: error.message})
    }
}

const update = async(req,res)=>{
    try {
        const {title, desc}= req.body;
        const postId= req.params.id;

        const postUpdate= await Blogmodel.findById(postId);
        if (!postUpdate){
            return res.status(404).json({success:true, message:"Post not found"})
        }

        if (title) postUpdate.title=title;
        if (desc) postUpdate.desc= desc;
        //if (req.file) postUpdate.image =req.file.filename;

        await postUpdate.save();
        indexBlog(postUpdate);

        return res.status(200).json({success:true, message:"Blog got updated", post:postUpdate})

    } catch (error) {
        return res.status(500).json({success:true, message:"Internal server error", error: error.message})
    }
}

const toggleLikeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id; // Extracted from your existing auth/isAdmin middleware

        
        const blog = await Blogmodel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        
        const hasLiked = blog.likes.includes(userId);

        /*const updatedBlog = await Blogmodel.findByIdAndUpdate(
            blogId,
            hasLiked
                ? { $pull: { likes: userId } }
                : { $addToSet: { likes: userId } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: hasLiked ? "Blog unliked successfully" : "Blog liked successfully",
            likesCount: updatedBlog.likes.length
        }); */

        if (hasLiked) {
            // User already liked it -> Unlike it (Remove userId from array)
            blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
            await blog.save();
            return res.status(200).json({ success: true, message: "Blog unliked successfully", likesCount: blog.likes.length });
        } else {
            
            blog.likes.push(userId);
            await blog.save();
            return res.status(200).json({ success: true, message: "Blog liked successfully", likesCount: blog.likes.length });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export {Create, deletePost, getposts, update, toggleLikeBlog};