import { Response, Request } from "express";
import bcrypt from 'bcrypt';
import { AuthService } from "../services/auth-service";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import Userlogin from "../../interface/userInterface";

const jwtSecret: Secret = process.env.JWT_KEY!

//creating an instance
const authService = new AuthService()


export class AuthController{
// @DESC users can login to the website by validation
// @METHOD  post
// @PATH /login
    async login(req: Request, res: Response){
        const {email, password} = req.body;
        try {
            const userData: any = await authService.loginUser(email) //todo fix ts
            if(userData){
                const userVerify = await bcrypt.compare(password,userData[0].password)
                if(userVerify){                  
                    const token = jwt.sign({ userId: userData[0]._id }, jwtSecret, { expiresIn: '1h' });
                    res.status(200).json({message: "login success", token})
                }else{
                    res.status(401).json({messgae:"incorrect password"})
                }
            }else{
                res.status(401).json({message: "User not exists"})
            }
        } catch (error) {
            console.error("An error occoured on auth controller ", error)
        }
    }
// @DESC users can register to the website by validation
// @METHOD  post
// @PATH /register
    async registerUser(req: Request, res: Response) {
        try {
          const userData = req.body;
          const {email, password, confirmpassword, username} = userData
          const userDetails = await authService.isUserExists(email);
          if (userDetails && userDetails?.length > 0) {
            return res.status(401).json({message: "user already exists"});
          } else {
            let encrptpassword = await bcrypt.hash(password, 10);
            userData.password = encrptpassword;
            const user = await authService.registerUser(userData);
            if (user) {
              res.status(200).json({ message: "registered successfully", user });
            } else {
              res.status(401).json("invalid");
            }
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
}