import { populate } from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";
export const getAllUserDetails = async (req, res) => {
	try {
		const user_id = req.user.id;
		const userDetails = await User.findOne({_id: user_id})
		.populate({
			path: 'courses',
			populate: {
			  path: 'courseContent',
			  model: 'Section',
			  populate: {
				path: 'subSection', // Assuming this is the field name in your Section model
				model: 'SubSection'
			  }
			}
		  })
			
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const instructorDashbord = async(req,res)=>{
	try{
		const userId = req.user.id;
		const instructorDashbord = await Course.find({instructor:userId});
		const courseData  = instructorDashbord.map((course)=> {
			const totalStudentsEnrolled = course.students.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.title,
				courseDescription: course.description,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(err){
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}