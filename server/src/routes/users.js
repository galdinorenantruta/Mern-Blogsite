import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from "../models/users.js";


const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    
        const user = await userModel.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
       const hashedPassword = await bcrypt.hash(password, 10)
       const newuser =  new userModel({ username: username, password:hashedPassword});
       await newuser.save()
        res.json({ message: "User registered successfully" });

       
    
});

router.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    const user = await userModel.findOne({username})

    if(!user){
        return res.json({message: "User doesn't exists"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect"})
    


    }

    const token = jwt.sign({id:user._id}, "secret")
    res.json({token, userId: user._id})
});




export {router as userRouter}