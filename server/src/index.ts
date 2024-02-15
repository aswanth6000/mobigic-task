import express from 'express';
import connectToDatabase from './config/DBConfig';

const app = express();
app.use(express.json())


connectToDatabase() //database connection 


app.listen(8000, ()=>{
    console.log('app listening to port 8000');
})