import mongoose, {Document, Model, Schema} from "mongoose";
export interface UserDocument extends Document{
    username: string;
    email: string;
    password: string
}
const userSchema = new mongoose.Schema<UserDocument>({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
})

const userModel: Model<UserDocument> = mongoose.model("user", userSchema);
export default userModel 