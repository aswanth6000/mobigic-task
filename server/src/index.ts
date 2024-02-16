import express from 'express';
import connectToDatabase from './config/DBConfig';
import router from './modules/routes/auth-routes';
import fileRouter from './modules/routes/file-routes';

const app = express();

app.use(express.json())

//Routers
app.use(router)
app.use(fileRouter)


//database connection 
connectToDatabase() 

//server configuration
app.listen(8000, ()=>{
    console.log('app listening to port 8000');
})