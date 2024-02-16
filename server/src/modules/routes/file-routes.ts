import express from "express";
import { UserController } from "../controller/user-controller";
import { storage } from "../../config/multerConfig";
import multer from "multer";

const upload = multer({ storage });

const userController = new UserController() ;

const userRouter = express.Router()

//get route

userRouter.get('/getfiles', userController.getAllFiles)

//post route
userRouter.post('/upload',upload.single('filename'),userController.uploadFile )
userRouter.post('/downloadfile', userController.fileDownload);

//delete route
userRouter.delete('/deletefile', userController.fileDelete);

export default userRouter;