import Userlogin from "../../interface/userInterface";
import { AuthRepository } from "../repositories/auth-repository";

const authRepository = new AuthRepository()
export class AuthService{
    async loginUser(email: string){
        return authRepository.userLogin(email)
    } 
    async isUserExists(email: string){ 
        return authRepository.isUserexists(email)
    }
    async registerUser(userData: Userlogin){
        return authRepository.userRegistration(userData)
    }
}