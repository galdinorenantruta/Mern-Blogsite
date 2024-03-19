import mongoose  from 'mongoose'

const PostsSchema = new mongoose.Schema({
    title: {type:String, required: true, },
    content: {type:String, required: true},
    imageUrl:{type: String, required: true},
    date:{type: String, required:true},
    user:{type:String, ref:'users',  required: true},
})

export const PostsModel = mongoose.model("posts", PostsSchema);