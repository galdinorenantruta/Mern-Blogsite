import express from 'express'
import mongoose from 'mongoose'
import {PostsModel} from '../models/blogPosts.js'
    
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


export {router as postRouter}   