import express from 'express'
import connectDB from './config/db.mjs'
import User from './models/User.mjs'
import morgan from 'morgan';
import bcrypt from 'bcrypt'
import router from './routes/authRoute.mjs'
import cors from 'cors'
const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
connectDB()
const port=8081
app.use("/api/v1/auth",router)


app.listen(port,()=>console.log(`Running on port ${port}`))