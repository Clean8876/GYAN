
import express from  'express'
import { getAllUserDetails } from '../controller/Profile.js'



export const profileroute =express.Router()



profileroute.get('/getuser',getAllUserDetails)