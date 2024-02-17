import fileModel from "../../model/userFileSchema";
import userModel from "../../model/userSchema";

export class UserRepository{
    //file uploading to database
    async userFileUpload(data: any){ //todo ts fix ts
        try {
            const createdData = await fileModel.create(data)
            return createdData
        } catch (error) {
            console.error("An error in User Repository ", error);
        }

    }
    // file delte
    async userFileDelete(data: string){
        try {
            const deleteFile = await fileModel.findOneAndDelete({uniqueCode: data})
            return deleteFile
        } catch (error) {
            console.error("An error on user repository ", error)
        }
    }
    //file download
    async userFileDownload(data: string){
        try {
            const fileToDownload = await fileModel.findOne({uniqueCode: data})
            return fileToDownload
        } catch (error) {
            console.error("File download error",error);
        }
    }
    //get all files
    async getAllFiles(data: string, page: number){
        try {
            const PAGE_SIZE = 10
            const getAllFiles = await fileModel.find({userId: data}).sort({ createdAt: 1 }).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
            return getAllFiles;
        } catch (error) {
            console.error("Error in get all files", error);
            
        }
    }
}