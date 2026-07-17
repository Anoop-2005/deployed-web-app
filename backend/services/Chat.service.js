import axios from "axios";

const AI_BASE = process.env.AI_PORT || "http://localhost:9000";


export const indexBlog = async (post) => {
    try {
        const response = await axios.post(`${AI_BASE}/index`,{
                post_id: post._id.toString(),
                title: post.title,
                desc: post.desc,
            })
    } catch (error) {
        throw new Error(`AI index failed: ${error.message}`);
    }
};


export const askAi = async (payload) => {
    try {
        const response = await axios.post(`${AI_BASE}/chat`, payload,);
        return response.data;

    } catch (error) {
        throw new Error(`AI chat failed: ${error.message}`);
    }
};


export const deleteBlogIndex = async (postId) => {
    try {
        const response = await axios.delete(`${AI_BASE}/index/${postId}`,);  

    } catch (error) {
        throw new Error(`AI delete failed: ${error.message}`);
    }
};