import express from 'express';
import connectToDatabase from './config/DBConfig';
import router from './modules/routes/auth-routes';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.json())

//Routers
app.use(router)


export {app}