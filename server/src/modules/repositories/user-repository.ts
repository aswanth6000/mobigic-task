import fileModel from "../../model/userFileSchema";

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
            if(fileToDownload){
                return fileToDownload
            }else{
                return
            }
        } catch (error) {
            console.error("File download error",error);
        }
    }
    //get all files
    async getAllFiles(data: string){
        try {
            const allFiles = await fileModel.find({userId: data}).sort({ createdAt: 1 })
            return allFiles;
        } catch (error) {
            console.error("Error in get all files", error);
            
        }
    }
}