import express from "express";
import { UserController } from "../controller/user-controller";
import { storage } from "../../config/multerConfig";
import multer from "multer";

const upload = multer({ storage });

const userController = new UserController;

const fileRouter = express.Router()

fileRouter.post('/upload',upload.single('uploadFile'),userController.uploadFile )

export default fileRouter