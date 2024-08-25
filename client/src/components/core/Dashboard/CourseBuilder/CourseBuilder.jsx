import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { createSection,updateSection } from "../../../../services/operations/courseApi"
import { setCourse,setEditCourse,setStep } from "../../../../slices/courseSlice"
import Iconbtn from "../../../common/Iconbtn"
import Nest from "./Nest"


export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
      const { course } = useSelector((state) => state.course)
      const { token } = useSelector((state) => state.auth)
      const [loading, setLoading] = useState(false)
      const [editSectionName, setEditSectionName] = useState(null)
      
      const dispatch = useDispatch()
    // handel sumbmission
    const onSubmit = async(data)=>{
        setLoading(true);
        let res
        console.log("Course ID:", course.newCourse._id);
    if (!course.newCourse._id) {
        toast.error("Course ID is missing");
        setLoading(false);
        return;
    }
        if(editSectionName){
            res = await updateSection({
                sectionName:data.sectionName,
                sectionId:data.sectionId,
                courseId:course._id,
            },token)
        }
        else{
            res = await createSection({
                sectionName:data.sectionName,
                courseId:course.newCourse._id,
               
            },token)
        }
        if(res){
           console.log("API Response:", res);
            dispatch(setCourse(res))
            setEditSectionName(null)
            setValue("sectionName","")
        }
        setLoading(false);



    }
    const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
      }
      const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
          cancelEdit()
         
        }
        else{  setEditSectionName(sectionId)
        setValue("sectionName", sectionName)}
      
      }
      const goToNext = () => {
        if (course.courseContent.length === 0) {
          toast.error("Please add atleast one section")
          return
        }
        if (
          course.courseContent.some((section) => section.subSection.length === 0)
        ) {
          toast.error("Please add atleast one lecture in each section")
          return
        }
        console.log("Cliked")
        dispatch(setStep(3))
      }
    
      const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
      }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sectionName">
          Section Name <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="sectionName"
          disabled={loading}
          placeholder="Add a section to build your course"
          {...register("sectionName", { required: true })}
          className="form-style w-full"
        />
        {errors.sectionName && (
          <span className="ml-2 text-xs tracking-wide text-red-900">
            Section name is required
          </span>
        )}
      </div>
      <div className="flex items-end gap-x-4">
        <Iconbtn
          type="submit"
          disabled={loading}
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
        >
          {<IoAddCircleOutline size={20} className="text-[#ff6525]" />}
        </Iconbtn>
        {editSectionName && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-sm text-richblack-300 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form><Nest handleChangeEditSectionName = {handleChangeEditSectionName} />
 
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <Iconbtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </Iconbtn>
      </div>
  </div>
  )
}

