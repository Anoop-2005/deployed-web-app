import  UserModel from "../models/user.model.js";
import  Jwt  from "jsonwebtoken";


const Register= async(req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);
        const { name, email, password } = req.body;

        //basic validation 
        if (!name || !email || !password ){
            return res.status(400).json({message:"All field are important!"})
        }

        //checking if user exists
        const existUser = await UserModel.findOne({email: email.toLowerCase() });
        if (existUser) {
            return res.status(400).json({success: false, message: "USer already exits please Login"})
        }
        //const hashpassword = await bcrypt.hashsync(password, 10) then save it new user instead of password-> hashpassword 
        //creating new user 
        const NewUser = await UserModel.create({
            name, email: email.toLowerCase(), password
        });
        //await NewUser.save() - redundant use with new user model
        return res.status(200).json({success:true, message:'User Register Successfully', user: NewUser});


    }catch (error) {
        res.status(500).json({message: "Internal server error ", error: error.message });

    }
};

const Login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success:false, message: "Please provide email and password"});
        }

        //checking if user existe
        const FoundUser = await UserModel.findOne({email: email.toLowerCase()});

        if (!FoundUser) return res.status(400).json({success: false, message:"User not found. Please Register"});

        //const comparpassword = await bcryptjs.compare(password, FindUser.password)
        //if (!comparepassword) return res.statue(400) -> Invalid passwor already in usemodel

        const isMatch = await FoundUser.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            success: false,
            message : "Invalide credentials"
        })

        const token = Jwt.sign({userID:FoundUser._id}, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly: true,
            secure:true,
            sameSite: "none",
            maxAge:3*24*60*60*1000
        })

        res.status(200).json({
            success:true,
            message: "Logged in Successfully",
            user: FoundUser,
            token
        })

    }catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error", error: error.message})

    }
}

const Logout = async(req, res)=>{
    try{
        /*const { email } = req.body;
        const user = await UserModel.findOne({email});
        if (!user) return res.status(404).json({success:false, message:"User not found"});*/

        res.clearCookie('token', {path:'/', sameSite:"none", secure:true });
        res.status(200).json({success:true, message:"Logout Successful"})

    }catch (error){
         res.status(500).json({success: false, message: "Internal Server Error", error: error.message})

    }
}

const updateProfile=async(req, res) => {
    try {
        const userId= req.params.id;
        const { name, oldPassword, newPassword }= req.body;

        const existUser = await UserModel.findById(userId);
        if (!existUser) {
            return res.status(404).json({success:false, message: "Account not Found"});
        }

        if (oldPassword){
            const isMatch = await existUser.comparePassword(oldPassword);
            if (!isMatch) {
                return res.status(404).json({success:false, message:"Old password in wrong"})
            }
        }

        if (name) {
            existUser.name = name;
        }

        if (oldPassword && newPassword) {
            existUser.password = newPassword;
        
        }else if (oldPassword && !newPassword) {
            return res.status(404).json({success:false, message:"Please write new password"})
        }
        await existUser.save();

        res.status(200).json({success:true, message:'Profile Update Successfully', user:existUser})

    } catch (error) {
        console.error('Error Updating Profile'. error);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}

export {Logout, Login, Register, updateProfile};  