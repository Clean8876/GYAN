import otpgenerator from 'otp-generator';
import User from '../models/User.js';
import OTP from '../models/otpModel.js';
import Profile from '../models/Profile.js';
import { generateTokken,cookieToken } from '../utils/generateTokken.js'; 
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'




export const regUser = asyncHandler(async(req,res)=>{
    try
    {
      //taking body input
        const {firstName,
			lastName,
			email,
            contactNumber,
			password,
			confirmPassword,
			accountType,
			otp,
        } = req.body;

        	// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).json({
				message: "All Fields are required",
			});
		}
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"password are not matched please try  again"
            })

        }
    const userExist = await User.findOne({email});
    if(userExist){
        return  res.status(400).json({message:'user exsist'})
    }
    	// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    const newUser =  new User({firstName,
        lastName,
        email,
        contactNumber,
        password,
        accountType:accountType,
        approved:approved,
        additionalDetails:profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
    await newUser.save()
    return res.status(201).json({message:'succesfully Regesterd',newUser

     });
   
}
    
    catch(err){
        console.error('error in register',err);
        return res.status(500).json({message:'internal server error'})
        
    }
   
})

export const sendOTP = async (req, res) => {
    try {
      const { email } = req.body;
      // Check if user is already present
      const checkUserPresent = await User.findOne({ email });
      // If user found with provided email
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: 'User is already registered',
        });
      }
      //genrating 6 digit otp
      let otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      //setting the unique otp to otp model
      let result = await OTP.findOne({ otp: otp });
      while (result) {
        otp = otpgenerator.generate(6, {
          upperCaseAlphabets: false,
        });
      }
      //saving the otp
      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);
      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        otp,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  // User Login Function
  export const authUser = asyncHandler(async(req,res)=>{
    try{
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  // Generate token
  const token = generateTokken(user.email, user._id,user.accountType);

  // Set token in cookie
  cookieToken(res, token);

  // Respond with user details and token
  return res.status(200).json({
      message: 'Authentication successful',
      token,
      user:user
      ,
  });
} catch (err) {
  console.error('Error during authentication', err);
  return res.status(500).json({ message: 'Internal server error' });
}
})

export const logUser = asyncHandler(async(req,res)=>{
   
    
  res.cookie('JWT','', {
     httpOnly: true, // Prevent client-side JavaScript access
     secure: process.env.NODE_ENV == 'production', // Use HTTPS in production
     maxAge: new Date(0), // 1 hour (match token expiration)
      sameSite: 'strict', // Optional: restrict cookie to same-site requests
   })
   res.status(200).json({ message: 'Successfully logged out' });



})