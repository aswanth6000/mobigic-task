import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface FileDocument extends Document {
  filename: string;
  userId: ObjectId;
  uniqueCode: string;
}

const fileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  filename: String,
  uniqueCode: String,
});

const fileModel: Model<FileDocument> = mongoose.model<FileDocument>("File", fileSchema);
export default fileModel;
