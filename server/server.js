import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./config/db.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import {router} from './route/userRoute.js'
import { profileroute } from "./route/profileRoute.js";
import { courseRouter } from "./route/courseRoute.js";
import { payrouter } from "./route/paymentRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";


//.env config
dotenv.config(); 
//mongoose connection
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
}));

// Setup the API route
app.use(cookieParser())
app.use(cors());
app.use('/api/user', router);
app.use('/api/profile', profileroute);
app.use('/api/course', courseRouter);
app.use('/api/pay', payrouter);
app.use(notFound);
app.use(errorHandler);
//setting Port 
const port = process.env.PORT||5000   
// getting url from the React client

// sending  response to web
app.get('/',(req,res)=>{
    res.send("sever is ready")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);})