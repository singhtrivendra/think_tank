import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/thinkTank").then(()=>{
    console.log("connect") ; 
}).catch(()=>{
    console.log("not connected")
});
import { model,Schema } from "mongoose";


const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
export const UserModel =  model("User",UserSchema)


const ContentSchema = new Schema({
    title: String,
    link: String,
    description: String,
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



