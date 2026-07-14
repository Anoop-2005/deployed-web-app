import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
     postId: { type: mongoose.Schema.Types.ObjectId, ref:"Posts", required: true},
     userId: { type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    comment: {type:String, required: true}

    }, {timestamps:true}
)


const CommentModel=mongoose.model("comment", commentSchema);
export default CommentModel;