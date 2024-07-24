import { createCategory ,delCategory,getCategory,getCategoryDetails} from '../controller/Category.js';
import { createCourse,editCourse,getAllCourses,getCourseDetails,getFullCourseDetailes } from "../controller/Course.js";
import { createSubSection ,updateSubSection,deleteSubSection} from '../controller/subSection.js';
import { createSection,getSection,updateSection,deleteSection } from '../controller/Section.js';
import express from 'express'
import { authenticateToken,forInstructor } from '../middleware/authMiddleware.js';


export  const courseRouter = express.Router()
courseRouter.post('/createcategory',createCategory);
courseRouter.delete('/deletecategory/:id',delCategory);
courseRouter.get('/category/',getCategory);
courseRouter.post('/getCategoryPageDetails',getCategoryDetails);
courseRouter.post('/createcourse/',authenticateToken,forInstructor,createCourse);
courseRouter.put('/editcourse/',authenticateToken,forInstructor,editCourse);
courseRouter.get('/',getAllCourses);
courseRouter.post('/getCourseDetails',getCourseDetails);
courseRouter.get('courseProgress/:id',authenticateToken ,getFullCourseDetailes)
courseRouter.post('/addsection',createSection)
courseRouter.get('/section/',getSection)
courseRouter.post('/section/subsection/',createSubSection)
courseRouter.put('/section/updatesection/',updateSection)
courseRouter.post('/section/deleteSection/',deleteSection)
courseRouter.post('/section/:id/updatesubsection/',updateSubSection)
courseRouter.post('/section/:id/deletesubsection/',deleteSubSection)