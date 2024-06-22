import mongoose from "mongoose";
import bcrypt from "bcrypt"
// User model with the refernce
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim:true,
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
    },
    email:{
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
    },
    // user Type
    accountType:{
        type: String,
        enum:["Admin","Student","Instructor"],
        required: true,
    },
    active:{
        type:Boolean,
        default:false,
    },
    approved:{
        type:Boolean,
        default:false,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"profile",
    },
    // refernce from other objectId
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
        required: true,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courseProgress",
        },
    ],

},
{timestamps:true});
userSchema.pre ('save',async function (next){
    if(!this.isModified('password')){
       return next()
    }
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

 const User =  mongoose.model("User",userSchema)
 export default User;

/* import mongoose from "mongoose";
import bcrypt from  'bcrypt';


const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    
},{
        timestamps:true
    },);

userschema.pre('save',async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
const User = mongoose.model('User', userschema);
export default  User; */