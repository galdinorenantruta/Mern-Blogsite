import mongoose  from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {type:String, required: true, },
    password: {type:String, required: true},
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref:"posts" }]
})

export const userModel = mongoose.model("users", UserSchema)