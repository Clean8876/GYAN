import express from 'express'
import { verifyPayment , buyCourse } from '../controller/Payment.js'
import { authenticateToken ,forInstructor,forStudent} from '../middleware/authMiddleware.js'


export const payrouter = express.Router()


payrouter.post("/capturePayment", authenticateToken, forStudent, buyCourse)
payrouter.post("/verifyPayment",authenticateToken, forStudent, verifyPayment)