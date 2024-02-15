import { Request, Response } from "express";
import jwt, {  JwtPayload, Secret } from "jsonwebtoken";
import { UserService } from "../services/user-service";
import FileType from "../../interface/file-interface"

const userService = new UserService()

const jwtSecret: Secret = process.env.JWT_KEY!

export class UserController{
// @DESC authenticated users can upload files
// @METHOD  post
// @PATH /upload
    async uploadFile(req: any, res: Response){ //todo ts fix
        try {
            if(req.files){
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
                
            }
        } catch (error) {
            
        }
    }
}