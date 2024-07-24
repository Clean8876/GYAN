
import JWT from 'jsonwebtoken';
import asyncHandler from "express-async-handler"
 export const authenticateToken = asyncHandler(async(req, res, next) => {
    try {
  const token = req.cookies.JWT || req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(403).json({ message: 'A Token is required for authentication' });
  }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Log the verified token and the stored token to the console
    console.log('Verified token:', decoded);
    next();   
  } catch(err) {
    return res.status(401).json({ message: 'Invalid Token'});
  }
});

export const forInstructor =(req,res,next)=>{
    console.log('req.user:', req.user);
    if(req.user.accountType !== 'Instructor'){
        return res.status(403).json({message:"You are not authorized to access this route"
            })
}
next();
}
export const forStudent =(req,res,next)=>{
    if(req.user.accountType !== 'Student'){
        return res.status(403).json({message:"You are not authorized to access this route"
            })
}
next();
}
export const forAdmin =(req,res,next)=>{
    if(req.user.accountType !== 'Admin'){
        return res.status(403).json({message:"You are not authorized to access this route"
            })
}
next();
}



