import express from "express";
import { UserController } from "../controller/user-controller";
import { storage } from "../../config/multerConfig";
import multer from "multer";

const upload = multer({ storage });

const userController = new UserController;

const userRouter = express.Router()

userRouter.post('/upload',upload.single('filename'),userController.uploadFile )
userRouter.delete('/deletefile', userController.fileDelete);

export default userRouter;