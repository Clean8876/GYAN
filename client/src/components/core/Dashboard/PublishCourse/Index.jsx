import { COURSE_STATUS } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../services/operations/courseApi";
import { resetCourseState, setStep } from "../../../../slices/courseSlice";
import Iconbtn from "../../../common/Iconbtn";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course.status, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourse = () => {
    dispatch(resetCourseState());
    navigate("/");
  };

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourse();
      return;
    }

    const courseStatus = getValues("public")
      ? "Published"
      : "Draft";

    const updatedCourse = {
      courseId: course._id,
      status: courseStatus,
    };
    console.log(updatedCourse.courseId)

    setLoading(true);
    const result = await editCourseDetails(updatedCourse, token);
    setLoading(false);

    if (result) {
      goToCourse();
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    handleCoursePublish();
    navigate("")
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 overflow-y:auto">
      <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <Iconbtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
}
