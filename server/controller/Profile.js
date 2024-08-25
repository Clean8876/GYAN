import User from "../models/User.js";
export const getAllUserDetails = async (req, res) => {
	try {
		const user_id = req.user.id;
		const userDetails = await User.findOne({_id: user_id})
			/* .populate("additionalDetails")
			.populate("courses")
			.populate("courseProgress")
			.exec(); */
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