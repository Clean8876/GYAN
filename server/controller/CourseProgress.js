
import CourseProgress from "../models/courseProgress.js";
import SubSection from "../models/subSection.js";

export const CourseCompletion = async (req,res)=>{
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;
      // Check if courseId and userId are provided
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is missing" });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing" });
  }

    try{
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({message: "SubSection not found"});
        }
                // Log the courseId and userId before querying
        console.log(`Querying CourseProgress with courseId: ${courseId} and userId: ${userId}`);
    
        let courseProgress = await CourseProgress.findOne({
            courseID :courseId,
            userId:userId
        })
        console.log("CourseProgress retrieved:", courseProgress);
        if(!courseProgress){
            return res.status(404).json({message:"CoursePorgress Not Found"})
        }
        else{
            console.log("courseProgress validation is doned");
            if(courseProgress.completedVideos.includes(subSection)){
                return res.status(400).json({message: "Video already completed"})
            }
            courseProgress.completedVideos.push(subSection);
            console.log("video is comepleted");

        }
        await courseProgress.save()
        res.status(200).json({message: "Video completed successfully"})



    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"An error occurd in the video progress",err})

    }
}