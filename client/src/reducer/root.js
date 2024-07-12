import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../slices/AuthSlice'
import courseReducer from "../slices/courseSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer

})

export default rootReducer