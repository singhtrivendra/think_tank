import mongoose from "mongoose";
mongoose.connect("mongodb+srv://trivendra_07:fSK7sDCfhMbnXKa1@cluster0.1zrsr.mongodb.net/brainly");
import { model,Schema } from "mongoose";


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



