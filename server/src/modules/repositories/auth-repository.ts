import Userlogin from "../../interface/userInterface";
import userModel from "../../model/userSchema";


export class AuthRepository{

    //Login
    async userLogin(email: string){ 
        try {
        const user = await userModel.find({email: email});
        return user
        } catch (error) {
            console.error("An error Occoured on Auth Repository: ", error)
        }
    }
    //Register
    async userRegistration(userData: Userlogin){
        try {
            const user = await userModel.create(userData)
            return user;
        } catch (error) {
            console.error("An error occoured", error)
        }
    }
    //checking if user exists or not
    async isUserexists(email: string){
        try{
            const userdata= await userModel.find({email: email});
           return userdata
         }catch(error){
             console.error("An errror occoured on auth repo", error);
         }
    }
}