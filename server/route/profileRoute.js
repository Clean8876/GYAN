
import express from  'express'
import { getAllUserDetails } from '../controller/Profile.js'
import { authenticateToken } from '../middleware/authMiddleware.js'



export const profileroute =express.Router()



profileroute.get('/getuser',authenticateToken,getAllUserDetails)