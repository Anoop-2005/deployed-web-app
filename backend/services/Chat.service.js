import axios from 'axios';

const AI_BASE=process.env.AI_PORT || "http://localhost:9000";

export const indexBlog=(post) =>
    axios.post(`${AI_BASE}/index`, {
        post_id:post._id.toString(),
        title: post.title,
        desc: post.desc,
    }).catch((err)=> console.log("AI index error", err.message));

export const askAi=(payload) =>
    axios.post(`${AI_BASE}/chat`, payload).then((res)=> res.data);

