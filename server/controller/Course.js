import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/fileUploader.js";
import { convertSecondsToDuration } from "../utils/secondToDuration.js";
import Section from "../models/Section.js";
import SubSection from "../models/subSection.js";
import CourseProgress from "../models/courseProgress.js";





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

export const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.body; // Extracting _id from req.body
    const courseDetails = await Course.findById(id)
      .populate('instructor')
      .populate('category')
      .populate('rating')
      .populate({
        path: 'courseContent',
        populate: {
            path: 'subSection',
        },
    })

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
// get the course detales of the perticular student
export const getFullCourseDetailes = async (req,res)=> {
  const { courseId } = req.body
    const userId = req.user.id
  try{
    const courseDetails = await Course.findOne({
      _id:courseId,
    }).populate({
      path: "instructor",
   
    })
    .populate("category")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec(); let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
 


export const getInstructorCourse = async(req,res)=>{
  try{const userId = req.user.id
  const inst = await Course.find(userId).sort({createdAt: -1})
res.json({
  success:true,
  message:'instructor course',
})
}
catch(err){
  console.error(err)
  res.status(500).json({
    success:false,
    message:'server error'
  })
}
  
}


export const deleteCourse = async (req,res)=>{
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course?.students
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course?.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section?.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
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
