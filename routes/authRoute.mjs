import express from 'express'
import {registerController,loginController,middleware,otp,scoreController,getScoreController} from '../controllers/authController.mjs'

const router=express.Router()
router.post('/register',registerController)
router.post('/login',loginController)
router.post('/send-otp',otp)
router.post('/updatescore',middleware,scoreController)
router.get('/getscore',middleware,getScoreController)
export default router;
