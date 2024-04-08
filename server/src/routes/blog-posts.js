import express from 'express'

import {PostsModel} from '../models/blogPosts.js'
import { userModel } from '../models/users.js'
    
const router = express.Router()

router.get("/", async(req, res) =>{
    try{
        const response = await PostsModel.find({})
    res.json(response)
    }
    catch(err){
      res.json(err)

    }
})

router.post('/', async(req, res) => {
    const post = new PostsModel(req.body)
    try{
     await post.save()
        res.json(post) 
    }catch(err){
        res.json(err)
    }
})

router.put('/', async(req, res) => {
    const postID = req.body.postID;
    const userID = req.body.userID;
    
    try {
        const post = await PostsModel.findById(postID);
        const user = await userModel.findById(userID);

        if (!post) {
            console.log("Post not found:", postID);
            return res.status(404).json({ error: "Post not found" });
        }

        if (!user) {
            console.log("User not found:", userID);
            return res.status(404).json({ error: "User not found" });
        }

        // Verifica se a propriedade savedPosts é um array, se não for, inicializa como um array vazio
        if (!Array.isArray(user.savedPosts)) {
            user.savedPosts = [];
        }   

        user.savedPosts.push(post);
        await user.save();
        res.status(201).json({ savedPosts: user.savedPosts });
    } catch (err) {
        console.error("Error saving post:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/savedPosts/ids/:userId', async (req, res) => {
        try{
            const user = await userModel.findById(req.params.userId)

            res.json({savedPosts:user?.savedPosts})

        }catch(err){
            res.json(err)
        }

})


router.get('/savedPosts/:userId', async (req, res) => {
    try{
        const user = await userModel.findById(req.params.userId)    
        const savedPosts = await PostsModel.find({
            _id:{$in: user.savedPosts}
        })
        res.json({savedPosts})

    }catch(err){
        res.json(err)
    }

})

export {router as postRouter}   