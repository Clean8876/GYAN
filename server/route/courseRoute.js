import { createCategory ,delCategory,getCategory,getCategoryDetails} from '../controller/Category.js';
import { createCourse,deleteCourse,editCourse,getAllCourses,getCourseDetails,getFullCourseDetailes,getInstructorCourse } from "../controller/Course.js";
import { createSubSection ,updateSubSection,deleteSubSection} from '../controller/subSection.js';
import { createSection,getSection,updateSection,deleteSection } from '../controller/Section.js';
import express from 'express'
import { authenticateToken,forInstructor, forStudent } from '../middleware/authMiddleware.js';
import { CourseCompletion } from '../controller/CourseProgress.js';


export  const courseRouter = express.Router()
courseRouter.post('/createcategory',createCategory);
courseRouter.delete('/deletecategory/:id',delCategory);
courseRouter.get('/category/',getCategory);
courseRouter.post('/getCategoryPageDetails',getCategoryDetails);
courseRouter.post('/createcourse/',authenticateToken,forInstructor,createCourse);
courseRouter.post('/editcourse/',authenticateToken,forInstructor,editCourse);
courseRouter.get('/',getAllCourses);
courseRouter.post('/getCourseDetails',getCourseDetails);
courseRouter.post('/getFullCourseDetails',authenticateToken ,getFullCourseDetailes)
courseRouter.post('/addsection',authenticateToken,forInstructor,createSection)
courseRouter.get('/section/',getSection)
courseRouter.post('/section/subsection/',authenticateToken,forInstructor,createSubSection)
courseRouter.post('/section/updatesection/',authenticateToken,forInstructor,updateSection)
courseRouter.post('/section/deleteSection/',deleteSection)
courseRouter.post('/section/updatesubsection/',updateSubSection)
courseRouter.post('/section/deletesubsection/',deleteSubSection)
courseRouter.post('/completedCourse',authenticateToken,forStudent,CourseCompletion)
courseRouter.get('/getInstructorCourses',authenticateToken,forInstructor,getInstructorCourse)
courseRouter.delete('/deleteCourse/',authenticateToken,deleteCourse)

