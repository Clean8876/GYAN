import mongoose from "mongoose";

const subsecSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,

    },
    video:{
        type:String,
    },
})

const subSection = mongoose.model("subSection",subsecSchema)
export default subSection;