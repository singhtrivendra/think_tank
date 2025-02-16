import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { ContentModel, LinkModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {JWT_PASSWORD} from "./config"
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

// console.log(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(cors(
    { 
        origin:"https://think-tank-iu9y-aqx0fkhv8-trivendras-projects.vercel.app",
        methods:["POST","GET"],
        credentials:true
    }
));

app.get("/",(req,res)=>{
    res.json("hello");
})
// Signup Route
app.post("/api/v1/signup", async (req, res) => {
    const  username = req.body.username;
    const password = req.body.password;
    const hashPassword  = await bcrypt.hash(password, 10)
    try {
        await UserModel.create({ username:username, password:hashPassword});
        res.json({ message: "User signed up successfully" });

    } catch (e) {
        console.log(e)
        res.status(411).json({
        
            message: "User already exist"
        });
    }
});

// Sign-in Route
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Find user by username
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            // Compare the entered password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
                res.json({ token });
            }
            else{
                res.status(403).json({ message: "Incorrect Credentials" });
                return ;
            }
        } else {
            res.status(403).json({ message: "Incorrect Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Content Post Management Routes
app.post("/api/v1/content",userMiddleware, async(req, res) => {
const link = req.body.link;
const type = req.body.type;
await ContentModel.create({

    link,
    type,
    title:req.body.title,
    // @ts-ignore
    userId:req.userId,
    tags:[]
})
    res.json({
        message:"content created"
    })
});

// content Fetch
app.get("/api/v1/content",userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username")

    res.json({
        content
    })

});

// content delete
app.delete("/api/v1/content",userMiddleware, async (req, res) => {
    const title =req.body.title;
    await ContentModel.deleteMany({
        title,
        //@ts-ignore
    })
    res.json({
        message:"content-deleted",
    })
});

// Brain Share Routes
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if(share){
    const existingLink = await LinkModel.findOne({
                //@ts-ignore
        userId:req.useerId
    });
    if(existingLink){
        res.json({
            hash: existingLink.hash
        })
        return;
    }
        const hash = random(10)
        await LinkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:hash
        })
        res.json({
            message:hash
        })
    }else{
        await LinkModel.deleteOne({
             //@ts-ignore
            userId:req.userId,
        });
    
    res.json({
        message:"Removed Link"
        })
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

const link =  await LinkModel.findOne({
        hash
    });
    if(!link){
        res.status(411).json({
            message:"Sorry incorrect input"
        })
        return;
    }
    const content = await ContentModel.find({
        userId: link.userId
    })

console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })
    
    if(!user){
        res.status(411).json({
            message:"user not found ! Something went wrong"
        })
        return;
    }
    res.json({
        username: user.username,
        content:content
    })
    

});

// Start Server


app.listen(5174, () => {
    console.log("Server is running on port 5174");
});
