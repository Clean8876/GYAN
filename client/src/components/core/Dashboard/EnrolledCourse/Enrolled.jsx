/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../../services/operations/courseApi"

export default function Enrolled() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      console.log("Fetched Courses:", res);
      const data = res.data; // Assume response.data holds the data
      if (data && data.courses) {
          setEnrolledCourses(data.courses);
      } else {
          setEnrolledCourses([]); // Set to empty array if courses are not available
      }
    } catch (error) {
      console.error("Could not fetch enrolled courses.",error)
      setEnrolledCourses([]);
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  },[token])
     // Log the state whenever it changes
     useEffect(() => {
      console.log("Enrolled Courses State:", enrolledCourses);
  }, [enrolledCourses]);

  return (
    <>
      <div className="text-3xl text-richblack-50 font-popo">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3 font-mono">Course Name</p>
            <p className="w-1/4 px-2 py-3 font-mono">Duration</p>
            <p className="flex-1 px-2 py-3 font-mono">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={course._id}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course._id}`
                  );
                }}
              >
                <img
                  src={course.image}
                  alt="course_img"
                  className="h-14 w-24 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold font-mono">{course.title}</p>
                  <p className="text-xs text-richblack-300 font-mono">
                    {course.description.length > 50
                      ? `${course.description.slice(0, 50)}...`
                      : course.description}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">
                {course.totalDuration || "N/A"}
              </div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}