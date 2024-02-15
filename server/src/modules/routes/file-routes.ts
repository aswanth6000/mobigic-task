import express from "express";
import { UserController } from "../controller/user-controller";
import { storage } from "../../config/multerConfig";
import multer from "multer";

const upload = multer({ storage });

const userController = new UserController;

const router = express.Router()

router.post('/upload',upload.single('uploadFile'),userController.uploadFile )