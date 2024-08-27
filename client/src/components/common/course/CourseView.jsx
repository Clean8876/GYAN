import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function VideoDetailsSidebar() {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-gray-300 bg-white">
      {/* Header */}
      <div className="mx-5 flex flex-col items-start justify-between gap-y-4 border-b border-gray-200 py-5 text-lg font-bold text-gray-800">
        <div className="flex w-full items-center justify-between">
          <div
            onClick={() => {
              navigate(`/dashboard/enrolled`)
            }}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-gray-200 p-1 text-gray-800 hover:bg-gray-300 transition-all duration-200"
            title="Back"
          >
            <IoIosArrowBack size={24} />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-mono">{courseEntireData?.title}</p>
          <p className="text-sm font-medium text-gray-500 font-popo">
            {completedLectures?.length} / {totalNoOfLectures} Lectures
          </p>
        </div>
      </div>

      {/* Sections and Subsections */}
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto scrollbar-hide">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-gray-700"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            {/* Section */}
            <div className={`flex justify-between px-5 py-4 rounded-lg bg-gray-100 transition-all duration-200 ${activeStatus === course?._id ? "bg-gray-200" : "hover:bg-gray-100"}`}>
              <div className="w-[70%] font-semibold text-base font-mono">{course?.sectionName}</div>
              <div className="flex items-center gap-3">
                <span className={`transform transition-transform duration-500 ${activeStatus === course?._id ? "rotate-0" : "-rotate-180"}`}>
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="pl-6 py-2 border-l-4 border-orange-500 bg-gray-50 rounded-md mt-2 transition-[height] duration-500 ease-in-out">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-200 ${videoBarActive === topic._id ? "bg-orange-400 font-semibold text-white" : "hover:bg-gray-100"}`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="form-checkbox h-4 w-4 text-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-popo">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
