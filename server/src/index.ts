import express from 'express';
import connectToDatabase from './config/DBConfig';
import router from './modules/routes/auth-routes';

const app = express();

app.use(express.json())

app.use(router)


//database connection 
connectToDatabase() 


app.listen(8000, ()=>{
    console.log('app listening to port 8000');
})