import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const MONGO_URL:string   = process.env.MONGO_URL!

if(!MONGO_URL){
    console.log("mongo db url connection is not defined");
    process.exit(1)
}

//database connection

export default function connectToDatabase () {
    mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
};