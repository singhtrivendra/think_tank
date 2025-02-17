import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
}
mongoose.connect(process.env.MONGO_URL);
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



