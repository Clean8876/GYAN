import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseApi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/ViewCourse';
import VideoDetails from '../components/common/course/VideoDetails';
import VideoDetailsSidebar from '../components/common/course/CourseView';


const ViewCourse = () => {


    const {courseId} = useParams();
    console.log("courseId id",courseId)
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse(courseId, token);
              console.log("Fetched courseData:", courseData);
              dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData.courseDetails.courseContent.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    });


  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            {/* Sidebar */}
            <div className="w-[320px] max-w-[350px] border-r border-gray-300 bg-white">
                <VideoDetailsSidebar />
            </div>

            {/* Video and Content Area */}
            <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto flex flex-col">
                <div className="flex-1 p-6">
                    <VideoDetails />
                </div>
                <div className="mx-6">
                    <Outlet />
                </div>
            </div>
        </div>
       
    </>
  )
}
export default ViewCourse