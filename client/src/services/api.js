

const BASE_URL = 'http://localhost:8000/api'

//AUTH ENDPOINT

export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/register",
    LOGIN_API: BASE_URL + "/user/login",
    RESETPASSTOKEN_API: BASE_URL + "/user/resetlink",
    RESETPASSWORD_API: BASE_URL + "/user/resetPassword",
  }
// COURSE ENDPOINTS
export const courseEndpoints = {

  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  COURSE_CATEGORIES_API: BASE_URL + "/course/category/",
  CREATE_COURSE_API:BASE_URL+"/course/createcourse/",
  EDIT_COURSE_API:BASE_URL+"/course/editcourse/"

}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/category/",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const studentEndpoint ={
CAPTUREPAYMENT_API :BASE_URL+"/pay/capturePayment",
VERIFYPAYMENT_API:BASE_URL+'/pay/verifyPayment'
}



 
