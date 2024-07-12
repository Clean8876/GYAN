import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

import { courseEndpoints } from "../api";

const{
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
}= courseEndpoints



export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
  
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }
  export const fetchCourseCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", COURSE_CATEGORIES_API)
      console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
      if (!response.data) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }