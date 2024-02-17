import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserService } from "../services/user-service";
import FileType from "../../interface/file-interface"
import fs from "fs";
import path from "path";


const userService = new UserService()

const jwtSecret: Secret = process.env.JWT_KEY!

export class UserController {
  // @DESC authenticated users can upload files
  // @METHOD  post
  // @PATH /upload
  async uploadFile(req: any, res: Response) { //todo ts fix
    try {
      
      if (req.file) {
        const { filename } = req.file;
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
          res.status(401).json({ error: 'Unauthorized - Token not provided' });
          return;
        }

        let decodedToken: JwtPayload;

        try {
          decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
        } catch (jwtError) {
          console.error('JWT Verification Error:', jwtError);
          res.status(500).json({message: "Internal server error"})
          res.status(401).json({ error: 'Unauthorized - Invalid token' });
          return;
        }        
        const userId = decodedToken.userId;
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const data: FileType = {
          userId: userId,
          filename: filename,
          uniqueCode: code
        }
        
        userService.fileUpload(data);
        res.status(200).json({message: "File uploaded successfully"})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Internal server error"})
    }
  }
  // @DESC authenticated users file delete
  // @METHOD  post
  // @PATH /deletefile
  async fileDelete(req: Request, res: Response) {
    const { fileId } = req.body;
    try {
      const deleteResult: any  = await userService.deleteFile(fileId); //todo fix ts      
      if(deleteResult){
        const {filename} = deleteResult;
        const PATH =  path.join(__dirname, '..','..','..','uploads', filename )
        //deleting from uploads folder
        fs.unlink(PATH, (err)=>{
          console.error(err);
        })
        res.status(200).json({message: "File deleted !"})
      }else{
        res.status(401).json({message: "File uploaded failed"})
      }
    } catch (error) {
      console.error("Error at user Controller", error)
      res.status(500).json({message: "Internal server error"})
    }
  }
  // @DESC download files after giving the code
  // @METHOD  post
  // @PATH /downloadfile

  async fileDownload(req: Request, res: Response){
    const { uniqueCode } = req.body
    try {
      const fileDownload: any = await userService.downloadFile(uniqueCode); //todo fix ts
      if(fileDownload){
        const { filename } = fileDownload
        const filePath = path.join(__dirname, '..','..','..','uploads', filename);
        res.download(filePath)
      }else{
        res.json({message: 'Incorrect Code'})
      }
    } catch (error) {
      console.error("Error in file download", error);
      res.status(500).json({message: "Internal server error"})
    }    
  }
  // @DESC download files after giving the code
  // @METHOD  get
  // @PATH /downloadfile
  async getAllFiles(req: Request, res: Response){
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({ error: 'Unauthorized - Token not provided' });
        return;
      }

      let decodedToken: JwtPayload;

      try {
        decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
      } catch (jwtError) {
        console.error('JWT Verification Error:', jwtError);
        res.status(500).json({message: "Internal server error"})
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
        return;
      }        
      const userId = decodedToken.userId;
      const allFiles: any = await userService.getAllFiles(userId)
      if(allFiles?.length > 0){
        res.status(200).json(allFiles)
      }else{
        res.json({message: " No files found"})
      }
    } catch (error) {
      console.error("Error in get all files in user controller", error);
      res.status(500).json({message: "Internal server error"})
    }
  }
}