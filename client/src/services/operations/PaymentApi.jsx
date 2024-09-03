
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
        script.onerror= () =>{
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

 
        console.log("Request Data:", { courses});
        
        //initiate the order
        const orderResponse = await apiConnector("POST", CAPTUREPAYMENT_API, 
            { courses: courses },
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            })

        if(!orderResponse.data) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            // eslint-disable-next-line no-undef
            key_id: import.meta.env.VITE_RZR_PAY_API,
            amount: `${orderResponse.data.payment.amount}`,
            currency: "INR",
            name:"GYAN",
            description: "Thank You for Purchasing the Course",
            image:logo,
            order_id:orderResponse.data.payment.id,
            prefill: {
                name:`${user.firstName}`,
                email:user.email
            },
            handler: function(response) {
               
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
  
        const paymentObject =new window.Razorpay(options)
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
        console.log("Payment options: ", options);

    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
    
        if (error.response) {
            const { status, data } = error.response;
    
            if (status === 400) {
                // Display specific error message from backend
                if (data && data.msg) {
                    toast.error(`Could not make payment. Error: ${data.msg}`);
                } else {
                    toast.error("Could not make payment. Please check the information you provided.");
                }
            } else {
                // Handle other status codes or generic errors
                toast.error(`Could not make payment. Error code: ${status}`);
            }
        } else {
            // Handle network errors or unexpected issues
            toast.error("Could not make payment. Network or unexpected error occurred.");
        }
    }
    toast.dismiss(toastId);
}

/* //verify payment
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
            console.log("Response Data:", response.data);
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
} */

    async function verifyPayment(bodyData, token, navigate, dispatch) {
        const toastId = toast.loading("Verifying Payment....");
        dispatch(setPaymentLoading(true));
        try{
            const response  = await apiConnector("POST", VERIFYPAYMENT_API, bodyData, {
                Authorization:`Bearer ${token}`,
            })
    
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("payment Successful, you are addded to the course");
            navigate("/");
           
        }   
        catch(error) {
            console.log("PAYMENT VERIFY ERROR....", error);
            toast.error("Could not verify Payment");
        }
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }