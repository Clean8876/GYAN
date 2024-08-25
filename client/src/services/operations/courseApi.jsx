import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

import { courseEndpoints,profileEndpoints } from "../api";


const{
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
    
}= courseEndpoints
const{GET_USER_ENROLLED_API}=profileEndpoints

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");

  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      id: courseId,
    });

    if (!response || !response.data) {
      throw new Error("Invalid response");
    }
    result = response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      result = error.response.data;
    } else {
      result = { message: "An error occurred" };
    }
  }
  toast.dismiss(toastId);
  return result;
};
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
  export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response.data) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  // edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response.data) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response.data.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response.data.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response.data.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const createSection = async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try{
    const response = await apiConnector("POST",CREATE_SECTION_API,data,{
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if(!response.data.success){
      throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
      result = response.data.data

  }
  catch(err){
    console.log("Create Section api error.....",err)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result

}

export const updateSection = async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const editCourse = async(data,token)=>{
  let result = null;
  const toastId = toast.loading("Loading...")
  try{
    const responce = await apiConnector("POST",EDIT_COURSE_API,data,{
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", responce)
    if(!responce.data.success){
      throw new Error("Could Not Edit Course")}
      toast.success("COurse details UPdsated succefully")
      result = responce.data


  }
  catch(err){
    console.log("EDIT COURSE API ERROR............", err)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result



}
export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
 
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}
