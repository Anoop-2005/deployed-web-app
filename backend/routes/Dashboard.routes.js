import express from "express";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { Getalldata, GetUSers, Userdelete } from "../controllers/Dashboard.controller.js";

const DashboardRoutes=express.Router();

DashboardRoutes.get('/', isAdmin, Getalldata)
DashboardRoutes.get('/users',isAdmin, GetUSers)
DashboardRoutes.delete("/deleteuser/:id", isAdmin,Userdelete)

export default DashboardRoutes;