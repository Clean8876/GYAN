/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"


import { fetchInstructorCourses } from "../../../../services/operations/courseApi"
import Iconbtn from "../../../common/Iconbtn"
import CoursesTable from "./CoursesTable"

export default function MyCourses({handleSidebarItemClick}) {
  const { token } = useSelector((state) => state.auth)

  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    
  }, [])
  const navigateToAddCourse = () => {
    handleSidebarItemClick('Addcourse');
  };

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <Iconbtn
          text="Add Course"
          onclick={navigateToAddCourse}
        >
          <VscAdd />
        </Iconbtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}