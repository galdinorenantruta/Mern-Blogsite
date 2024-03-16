import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from'./routes/users.js'

const app = express();

mongoose.connect("mongodb+srv://galdinotruta:Teste1234@blogapp.gk76vz5.mongodb.net/blogapp?retryWrites=true&w=majority&appName=blogapp")

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)
app.listen(3001, () => console.log("servidor rodando"))