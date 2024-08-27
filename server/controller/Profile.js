import { populate } from "dotenv";
import User from "../models/User.js";
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