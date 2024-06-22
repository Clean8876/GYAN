// create a function to reset link
//check for the email exist
// creat a password upadte by the reset link usinf token traking


import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { mailSender } from "../utils/mailSender.js";
import User from "../models/User.js";

export const restLink = async(req,res)=>{
    try{
        //get th mail
        const email = req.body.email;

        const user = await User.findOne({email})
        if(!user){
            res.json({
                success: false,
                message:"User email is not register"
            })

        }
        //genrate the random token
        const tokken =  crypto.randomUUID();
        //update the user with the token


        const updateUser = await User.findOneAndUpdate(
            {email},
            {
                tokken,
                resetPasswordExpires:Date.now() + 5*60*1000,
            },
            {new:true}

        )
        const URL = `http://localhost:3000/changePassword/${tokken}`

        await mailSender(email,"password reset Link",
            `password rest link :${URL}`
        )
       return res.json({
        success: true,
        message:"password reset link sent to your email"
       });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        })
    }

}


export const resetPassword = async(req,res)=>{
    try{
        const{password,confirmpassword,tokken} = req.body;
        if(password !== confirmpassword){
            return res.json({success:false,
                message:"password and confirm password not match",})
        }
        const user = await User.findOne({tokken})
        if(!user){
            return res.json({success:false,
                message:"Invalid tokken",})

        }
        const hassedPaasword = await bcrypt.hash(password,10)
        await User.findOneAndUpdate(
            {tokken},
            {password:hassedPaasword},
            {new:true},)
            return res.json({
                success: true,
                message:"password reset successfully"
            })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
    })}
}
