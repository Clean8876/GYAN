
import express from  'express'
import { getAllUserDetails ,instructorDashbord} from '../controller/Profile.js'
import { authenticateToken } from '../middleware/authMiddleware.js'



export const profileroute =express.Router()



profileroute.get('/getuser',authenticateToken,getAllUserDetails)
profileroute.get('/instructorDashboard',authenticateToken,instructorDashbord)