import express from 'express';
import connectToDatabase from './config/DBConfig';
import router from './modules/routes/auth-routes';
import dotenv from 'dotenv';
import session from 'express-session'


dotenv.config()
const expressSecret = process.env.EXPRESS_SESSION!

const app = express();
app.use(session({
    secret: expressSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(express.json())

//Routers
app.use(router)


//server configuration
app.listen(8000, ()=>{
    console.log('app listening to port 8000');
})

export {app}