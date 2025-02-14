import mongoose, { Model } from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/thinkTank");
import { model,Schema } from "mongoose";
import { string } from "zod";


const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
export const UserModel =  model("User",UserSchema)


const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type:mongoose.Types.ObjectId,ref:'Tag'}],
    type:String,
    userId: {type:mongoose.Types.ObjectId,ref:'User',require:true},
})
export const ContentModel = model("content",ContentSchema);


const LinksSchema = new Schema({
    hash:String,
    userId: {type:mongoose.Types.ObjectId,ref:'User',require:true},
})
export const LinkModel = model("Links",LinksSchema)



