
import mongoose, { Types } from "mongoose";


const courseSchema = new mongoose.Schema({
    title: {
        type : String
    },
    description :{
        type:String
    },
    price :{
        type:Number
    },
    courseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
		ref: "user",
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category",
        },
    image:{
         type:String
        },
    tag:{
            type:[String],
            required:true,
        },
    rating:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "rating",
    },
    students:[{type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:true,},],
    status:{
            type:String,
            enum:['Draft','Published']
        },        
},
{timestamps:true},
)
const Course = mongoose.model("Course",courseSchema)
export default Course;