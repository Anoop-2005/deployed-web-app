import express from "express";
import AddComment from "../controllers/comments.controller.js";
import { isLogin }  from "../middleware/isLogin.middleware.js";

const CommentsRoutes=express.Router();

CommentsRoutes.post('/addcomment',isLogin, AddComment)

export default CommentsRoutes;