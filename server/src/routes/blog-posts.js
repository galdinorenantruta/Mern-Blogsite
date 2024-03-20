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
    try{
    const post = await PostsModel.findById(req.body.postId)
    const user = await userModel.findById(req.body.userId)
    user.savedPosts.push(post)
    await user.save()
    res.json({savedPosts: user.savedPosts})
    }catch(err){
        res.json(err)
    }
})

router.get('/savedPosts/ids', async (req, res) => {
        try{
            const user = await userModel.findById(req.body.userId)

            res.json({savedPosts:user?.savedPosts})

        }catch(err){
            res.json(err)
        }

})


router.get('/savedPosts', async (req, res) => {
    try{
        const user = await userModel.findById(req.body.userId)
        const savedPosts = await userModel.find({
            _id:{$in: user.savedPosts}
        })
        res.json({savedPosts})

    }catch(err){
        res.json(err)
    }

})

export {router as postRouter}   