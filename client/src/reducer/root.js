import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../slices/AuthSlice'
import courseReducer from "../slices/courseSlice";
import profileReducer  from "../slices/ProfileSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    profile: profileReducer,
    

})

export default rootReducer