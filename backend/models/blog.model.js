import mongoose, { Schema } from "mongoose";

const BlogSchema=new Schema(
    {
        title: {type:String, required:true, trim:true},
        desc: { type:String, required: true, trim:true},
        likes: [{
                type: Schema.Types.ObjectId,
                ref: 'Users' // Make sure this matches your User model name exactly
            }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }]
    }, {timestamps:true}
)

const Blogmodel = mongoose.model("Posts", BlogSchema)

export default Blogmodel