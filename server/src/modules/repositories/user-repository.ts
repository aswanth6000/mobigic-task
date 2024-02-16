import FileType from "../../interface/file-interface";
import fileModel from "../../model/userFileSchema";
import userModel from "../../model/userSchema";

export class UserRepository{
    //file uploading to database
    async userFileUpload(data: FileType){ 
        try {
            const createdData = await fileModel.create(data)            
            return createdData
        } catch (error) {
            console.error("An error in User Repository ", error);
        }

    }
}