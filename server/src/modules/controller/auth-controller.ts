import { Response, Request } from "express";
import bcrypt from 'bcrypt';
import { AuthService } from "../services/auth-service";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import Userlogin from "../../interface/userInterface";
import dotenv from 'dotenv'; //dot env not required in newer version of node js // added for test using jest


dotenv.config()

const jwtSecret: Secret = process.env.JWT_KEY!

//creating an instance
const authService = new AuthService()


export class AuthController{
// @DESC users can login to the website by validation
// @METHOD  post
// @PATH /login
    async login(req: any, res: Response){
        const {email, password} = req.body;
        try {
            const userData: any = await authService.loginUser(email) //todo fix ts

            
            if(userData.length > 0){
                const userVerify = await bcrypt.compare(password,userData[0].password)                
                if(userVerify){
                    const token = jwt.sign({ userId: userData[0]._id }, jwtSecret, { expiresIn: '1h' });
                    req.session = {token: token};//setting token to sesion object
                    res.status(200).json({message: "login success", token})
                }else{
                    return res.status(401).json({messgae:"incorrect password"})
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
          const {email, password} = userData
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
              res.status(401).json({message: "Registration failed"});
            }
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
}