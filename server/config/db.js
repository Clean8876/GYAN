import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const URI = process.env.MONGO_URI;

if(!URI){
    console.log("Mongo URI not found");
}
const connectDB  = async()=>{
    try{
    await mongoose.connect(URI)
    console.log('Mongodb has connected')}
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
      }
}
export default connectDB