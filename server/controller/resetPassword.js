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
        const token =  crypto.randomUUID();
        //update the user with the token


        const updateUser = await User.findOneAndUpdate(
            {email},
            {
                token,
                resetPasswordExpires:Date.now() + 5*60*1000,
            },
            {new:true}

        )
        const URL = `http://localhost:3000/changePassword/${token}`

        await mailSender(email,"password reset Link",
            `password rest link :${URL}`
        )
       return res.json({
        success: true,
        message:"password reset link sent to your email"
       });

    }
    catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
          success: false,
          message: "Internal Server Error"
        });
      }

}

//Update the Password
export const resetPassword = async(req,res)=>{
    try{
        const{password,confirmpassword,token} = req.body;
        if(password !== confirmpassword){
            return res.json({success:false,
                message:"password and confirm password not match",})
        }
        const user = await User.findOne({token})
        if(!user){
            return res.json({success:false,
                message:"Invalid tokken",})

        }
        //update the password
        const hassedPaasword = await bcrypt.hash(password,10)
        await User.findOneAndUpdate(
            {token},
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
