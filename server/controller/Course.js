import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/fileUploader.js";




export const createCourse =async(req,res)=>{
    try
    {
        //getting user id
        const userid = req.user.id
       
       
        // creation of course
        let {
            title,
            description, 
            price,
            tag,
            category,
            status = "Draft",
          } = req.body
          
           // Configure Multer with storage
           
     // Log the received fields
     console.log('Title:', title);
     console.log('Description:', description);
     console.log('Tag:', tag);
     console.log('Status:', status);
     console.log('Price:', price);
     console.log('Category:', category);
     // Validate input
    /**/if (!title || !description || !price || !tag || !category ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const thumbnail = req.files.image
      // status validation
      /**/  if (!status) {
     status = 'Draft';
  }
         // Check user's role
    /**/ const user = await User.findById(userid);
    console.log(user)
    if (!user || user.accountType !== 'Instructor') {
      return res.status(403).json({ message: 'Instructor cannot be found' });
    }

    // Check category's existence
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    } 
    //upload Thumnail
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    // save to database
      const course = new Course({
        title,
        description,
       instructor:user._id,
        price,
        tag,
        category:categoryDetails._id,
        image : thumbnailImage.secure_url,
        status:status
      });
      
      const newCourse = await course.save();
      
    // Add course to instructor's courses array
    user.courses.push(newCourse._id);
    await user.save();

    // Add course to category's courses array
    categoryDetails.course.push(newCourse._id);
    await categoryDetails.save();
  
    return res.status(201).json({newCourse});
   
}
     
    catch(err){
        console.error('Problem in creating New course',err);
        return res.status(500).json({message:'internal server error'})
        
    }
}



