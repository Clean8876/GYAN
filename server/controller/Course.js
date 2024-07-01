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



//Edit the Course 

export const editCourse = async (req,res)=>{

try {
  const { courseId, ...updateFields } = req.body;

  // Find the course by ID and update it with the provided fields
  const course = await Course.findByIdAndUpdate(courseId, updateFields, { new: true });

  if (!course) {
      return res.status(404).json({ message: 'Course not found' });
  }

  // Populate the reference fields
  const populatedCourse = await Course.populate(course, [
    { path: 'instructor' },
    { path: 'category' },
    { path: 'rating' },
    { path: 'students' },
    { path: 'courseContent' }
]);
  res.status(200).json({ message: 'Course updated successfully', course,populatedCourse });
} catch (error) {
  console.error(error)
  res.status(500).json({ message: 'Error updating course', error });
}

}
//getting all course from the database which is published
export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },

    )
      .populate("instructor")
   

    return res.status(200).json({
      success: true,
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}
// get a Specific Course when students buy the course 

export const getCourseDetails = async (req,res)=>{
  try{

  const coursedetails = await Course.findById(req.params.id)
  .populate("instructor")
  .populate("category")
  .populate("rating")
  .populate({
    path: "courseContent",
    populate: {
      path: "SubSection",
      select:'video'}
  })
  if(!coursedetails){
    return res.status(404).json({
      success:false,
      message:'Course not Found'})
}
return res.status(200).json({
  success:true,
  data:coursedetails,
})
  

}
catch(err){
  console.error(err)
  return res.status(500).json({
    success:false,
    message:'Internal Server Error',
  })
}
}
// get the course detales of the perticular student
export const getFullCourseDetailes = async (req,res)=> {
  const userId = req.params.id
  try{
    const user = await  User.findById(userId).populate('courseProgress').populate({
      path: 'courseProgress',
      populate: {
        path: 'courseID',
        model: 'Course',
        populate: {
          path: 'courseContent',
          model: 'Section',
          populate: {
            path: 'subSection',
            model: 'subSection',
          },
        },
      },
    });
/*if (!//user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });*/
    const courseProgress = user.courseProgress;
    const progressData = courseProgress.map(progress => {
      const course = progress.courseID;
      const totalVideos = course.courseContent.reduce((total, section) => total + section.subSection.length, 0);
      const completedVideos = progress.completedVideos.length;
      const progressPercentage = (completedVideos / totalVideos) * 100;
      const averageVideoLength = course.averageVideoLength;
      const remainingVideos = totalVideos - completedVideos;
      const timeRemaining = averageVideoLength * remainingVideos;
      return {
        course,
        progressPercentage,
        timeRemaining,
      };
    });
    
    return res.status(200).json({
      success: true,
      data: progressData,
    })
  }
  catch(err){
    console.error(err)
  }
}






















































































































/* try{
  //req the courseId and loop the field in updates
  const{courseId , ...updates}= req.body;
  //find the course bu its id and update it 

  const updateCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set:{
        ...updates,
        tag:updates.tag? JSON.parse(updates.tag):undefined
    }
      },
      {new:true}

  ).populate([
    {
      path: "instructor",
      populate: { path: "additionalDetails" }
    },
    "category",
    "rating",
    {
      path: "courseContent",
      populate: { path: "subSection" }
    }
  ]);
  if (!updateCourse) {
    return res.status(404).json({ error: "Course not found" });
  }
  // If there is thumbnail in body update it
  if (req.files) {
    console.log("thumbnail update")
    const thumbnail = req.files.image
    const image = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    updateCourse.image = thumbnailImage.secure_url
  }
 await updateCourse.save();
 res.json({
  success: true,
  message: "Course updated successfully",
});
}
catch(err){
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
} */
