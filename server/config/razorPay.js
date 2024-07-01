import Razorpay from "razorpay";

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,
       key_secret: process.env.RAZORPAY_SECRETID
    })