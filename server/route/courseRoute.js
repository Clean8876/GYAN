import { createCategory ,delCategory,getCategory} from '../controller/Category.js';
import { createCourse } from "../controller/Course.js";
import express from 'express'
import { authenticateToken,forInstructor } from '../middleware/authMiddleware.js';


export  const courseRouter = express.Router()
courseRouter.post('/createcategory',createCategory);
courseRouter.delete('/deletecategory/:id',delCategory);
courseRouter.get('/category/',getCategory);
courseRouter.post('/createcourse/:id',authenticateToken,forInstructor,createCourse);