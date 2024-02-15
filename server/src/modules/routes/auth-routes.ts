import express from "express";
import {AuthController} from '../../modules/controller/auth-controller'

const authController = new AuthController()

const router = express.Router();

//POST routes
router.post('/login', authController.login)
router.post('/register', authController.registerUser)

export default router