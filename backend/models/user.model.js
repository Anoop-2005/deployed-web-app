import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; 

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true},
        email: { type: String, required: true, trim: true, unique: true, lowercase: true },
        password: { type: String, required: true, minlength: 6},
        role : { type: String, enum: ['admin', 'user'], default: 'user'},
        refreshToken : { type: String, default: null }
    }, {timestamps: true}
)

//hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error ;
    }
});

//compare password 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
    
}
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    }
});

const UserModel=mongoose.model("Users", userSchema)

export default UserModel;