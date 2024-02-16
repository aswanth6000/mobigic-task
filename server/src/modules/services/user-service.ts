import { UserRepository } from "../repositories/user-repository";
import FileType from "../../interface/file-interface"

const userRepository = new UserRepository()

export class UserService{
    //uploading file
    async fileUpload(data: FileType){ 
        try {
            return userRepository.userFileUpload(data)
        } catch (error) {
            console.error("An error on user service", error);
        }
    }
    // deleting file
    async deleteFile(data: string){
        try {
            return userRepository.userFileDelete(data)
        } catch (error) {
            console.error("Error on user service", error);
        }
    }
}