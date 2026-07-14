import Blogmodel from "../models/blog.model.js";
import { askAi } from "../services/Chat.service.js";

const chatWithBlog= async(req, res)=>{
    try {
        const {postId, question, mode} = req.body;
        const post = await Blogmodel.findById(postId);
        if (!post) {
            return res.status(404).json({success:false, message:"Blog not Found"});
        }
        const data = await askAi({
            post_id:postId,
            title:post.title,
            desc:post.desc,
            question,
            mode : mode || "qa"
        });
        res.status(200).json({success:true, ...data })
    } catch (error) {
        console.log("CHAT ERROR:", error.message);
        res.status(500).json({success:false, message:"AI backend eeror", error: error.message})
        
    }
}

export {chatWithBlog};