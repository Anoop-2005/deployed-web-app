import express from "express";
import dotenv from "dotenv";
import DBCon from "./utlis/db.js";
import AuthRoutes from "./routes/Auth.routes.js";
import cookieParser from "cookie-parser";
import BlogRoutes from "./routes/Blog.routes.js";
import DashboardRoutes from "./routes/Dashboard.routes.js";
import CommentsRoutes from "./routes/comments.routes.js";
import PublicRoutes from "./routes/Public.routes.js";
import cors from 'cors';
import AiRoutes from "./routes/Chat.route.js";

dotenv.config()

const PORT = process.env.PORT || 3000
const app=express();

const corsoption={
    origin:"https://deployed-web-app.pages.dev",
    credentials:true
}

//mongodb connnection
//DBCon()

app.use(cors(corsoption))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello from backend")
})

app.use("/auth", AuthRoutes)
app.use("/blog", BlogRoutes)
app.use('/dashboard', DashboardRoutes)
app.use('/comment', CommentsRoutes)
app.use('/public', PublicRoutes)
app.use('/chat', AiRoutes)

/*app.listen(PORT,()=> {
    console.log(`app is running on ${PORT}`)
})*/

const startServer = async () => {
    try {
        await DBCon(); 
        app.listen(PORT, ()=> {
            console.log(`App is running on ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server", error)
    }
}

startServer();