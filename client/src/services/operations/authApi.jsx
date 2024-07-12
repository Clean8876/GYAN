import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/AuthSlice"
import {setUser } from "../../slices/ProfileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../api"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  /*RESETPASSTOKEN_API,
  RESETPASSWORD_API, */
} = endpoints


export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
          const response = await apiConnector("POST", SENDOTP_API, {
            email,
            checkUserPresent: true,
          })
          console.log("SENDOTP API RESPONSE............", response)
    
          console.log(response.data.success)
    
          if (!response?.data?.success) {
            throw new Error(response?.data?.message)
          }
    
          toast.success("OTP Sent Successfully")
          navigate("/verify-email")
        } catch (error) {
          console.log("SENDOTP API ERROR............", error)
          toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
      }
  
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)
      if(!response.data){
        throw new Error(response.data.message)

      }
      toast.success("Account Created Successfully")
      navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Could Not Create Account")
        navigate('/signup')
        }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

    if(!response.data){
      throw new Error(response.data.message)

    }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data.user.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token",JSON.stringify(response.data.token))
      navigate("/");
    }  catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Could Not Login");
      navigate('/login')}
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function logout() {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    //dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
   
  }
}