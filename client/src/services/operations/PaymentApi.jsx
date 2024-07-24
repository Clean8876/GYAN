
import { studentEndpoint } from "../api";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import logo from '../../assets/gyanlogo.png'


const {CAPTUREPAYMENT_API,VERIFYPAYMENT_API} = studentEndpoint;
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
export async function buyCourse(token, courses, user, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        console.log("Token:", token);
        console.log("Authorization Header:", `Bearer ${token}`);
        console.log("Request Data:", { courses, userId: user._id });
        //initiate the order
        const orderResponse = await apiConnector("POST", CAPTUREPAYMENT_API, 
            {
                courses,
                userId: user._id,
              })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.msg);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            // eslint-disable-next-line no-undef
            key: process.env.RAZORPAY_KEYID,
            currency: orderResponse.data.msg.currency,
            amount: `${orderResponse.data.msg.amount}`,
            order_id:orderResponse.data.msg.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:logo,
            
            prefill: {
                name:`${user.firstName}`,
                email:user.email
            },
            handler: function(response) {
               
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
        console.log("Payment options: ", options);

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", VERIFYPAYMENT_API, bodyData,  {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/");
        //dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}