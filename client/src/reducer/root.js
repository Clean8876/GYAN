import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../slices/AuthSlice'
import courseReducer from "../slices/courseSlice";
import profileReducer  from "../slices/ProfileSlice";
import viewCourseReducer from "../slices/ViewCourse";


const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    profile: profileReducer,
    viewCourse: viewCourseReducer,
    

})

export default rootReducer