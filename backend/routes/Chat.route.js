import express from "express";
import { chatWithBlog } from "../controllers/Chat.controller.js";

const AiRoutes = express.Router();
AiRoutes.post("/", chatWithBlog);

export default AiRoutes;