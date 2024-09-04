import { profileEndpoints } from "../api";

const {GET_INSTRUCTOR_DATA_API}= profileEndpoints
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

export async function getInstructorData(token) {

    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
      {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("GET_INSTRUCTOR_API_RESPONSE..............", response);
      result = response?.data?.courses
  
    }
    catch(error) {
      console.log("GET_INSTRUCTOR_API ERROR", error);
      toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
  }