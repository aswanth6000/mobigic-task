import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserService } from "../services/user-service";
import FileType from "../../interface/file-interface"
import fs from "fs";


const userService = new UserService()

const jwtSecret: Secret = process.env.JWT_KEY!

export class UserController {
  // @DESC authenticated users can upload files
  // @METHOD  post
  // @PATH /upload
  async uploadFile(req: any, res: Response) { //todo ts fix
    try {
      if (req.files) {
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
    }
  }
  // @DESC authenticated users file delete
  // @METHOD  post
  // @PATH /file delete
  async fileDelete(req: Request, res: Response) {
    const { fileId } = req.body;
    try {
      const deleteResult: any  = await userService.deleteFile(fileId); //todo fix ts
      const {filename} = deleteResult;
      const PATH = `../../../uploads/${filename}`;
      fs.unlink(PATH, (err)=>{
        console.log("---del");
        console.log(err);
      })
      console.log(deleteResult);
    } catch (error) {
      console.error("Error at user Controller", error)
    }
  }
}