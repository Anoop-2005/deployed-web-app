import express from "express";
import { Register, updateProfile, Login, Logout, RefreshAcessToken } from "../controllers/Auth.controller.js";

import { isLogin } from "../middleware/isLogin.middleware.js";


const AuthRoutes=express.Router();

AuthRoutes.post("/register",   Register)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)
AuthRoutes.patch('/profile/:id', isLogin, updateProfile)
AuthRoutes.post("/refresh", RefreshAcessToken)


export default AuthRoutes;