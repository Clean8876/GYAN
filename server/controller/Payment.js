import { razorpay } from "../config/razorPay.js";
import User from '../models/User.js'
import Course from '../models/Course.js'
import mongoose from "mongoose";
import crypto from "crypto";
import CourseProgress from "../models/courseProgress.js";


//caputre the course wanted to buy for the user
export const buyCourse = async (req, res) => {
    // taking the Course and user id thorugh the body
    const { courses } = req.body;
    const user = req.user.id;
   // const user = req.user.id;
    //const  = '66757ef727845429f2d581b9'; // Single course ID as a string
    console.log(courses);

    if (!courses) {
        return res.status(400).json({ msg: "No course selected" });
    }

    // Check if the user exists
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    let totalAmount = 0;
    for(const course_id of courses){
         try {

       let course

         course = await Course.findById(course_id);
        if (!course) {
            return res.status(400).json({ msg: `Course with ID ${course} not found` });
        }
         if (!mongoose.Types.ObjectId.isValid(course)) {
            return res.status(400).json({ msg: `Invalid Course ID: ${course}` });
        }
        if (course.students.includes(user)) {
            return res.status(400).json({ msg: "Course already purchased" });
        }

        totalAmount += course.price;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", err });
    }}
   

    // Create payment config
    const options = {
        amount: totalAmount * 100, // in paisa
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const payment = await razorpay.orders.create(options);
        res.json({
            success: true,
            message: "Payment initiated successfully",
            msg:payment,
            payment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", err });
    }
}
// verify the secured payment made by razorpay from client to server
export const verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const courses = req.body.courses;
    const userId = req.user.id;
    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }
    //generate tge signature 
    /* const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRETID)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex"); */
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRETID)
            .update(body.toString())
            .digest("hex");

    if (generated_signature === razorpay_signature) {
        try {
            // Update the User and Course models
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
         

            for (const courseId of courses) {
                let course = await Course.findById(courseId);
                if (!course) {
                    return res.status(404).json({ success: false, message: `Course with ID ${courseId} not found` });
                }

                // Add user to course's students array if not already enrolled
                if (!course.students.includes(userId)) {
                    course.students.push(userId);
                    await course.save();
                }

                // Add course to user's courses array if not already enrolled
                if (!user.courses.includes(courseId)) {
                    user.courses.push(courseId);
                }
                const courseProgress = await CourseProgress.create({
                    courseID:courseId,
                    userId:user.id,
                    completedVideos:[]
                })
                if(!user.courseProgress){
                    user.courseProgress=[];
                }
                user.courseProgress.push(courseProgress._id);
            }

            await user.save();

            res.status(200).json({ success: true, message: "Payment verified and enrollment updated successfully" });
        } catch (error) {
            console.error("Error updating enrollment:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
};