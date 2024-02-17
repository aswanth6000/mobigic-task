import express from 'express';
import connectToDatabase from './config/DBConfig';
import router from './modules/routes/auth-routes';
import dotenv from 'dotenv';
import userRouter from './modules/routes/file-routes';
import cors from 'cors';


dotenv.config()

const app = express();
app.use(cors())

app.use(express.json())

//Routers
app.use(router)
app.use(userRouter)


//database connection 
connectToDatabase() 

//server configuration
app.listen(8000, ()=>{
    console.log('app listening to port 8000');
})