
import { useSelector } from "react-redux"



export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)


  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-black-5 font-popo">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-gray-200 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5 font-mono">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300 font-mono">{user?.email}</p>
          </div>
        </div>
  
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-gray-200 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5 font-popo" >About</p>

        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium font-popo`}
        >
          {user?.additionalDetails?.about ?? `Hello This Is "${user.firstName }"  I Love to Learn `}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-gray-200 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5 font font-popo">
            Personal Details
          </p>
   
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600 font-mono">First Name</p>
              <p className="text-sm font-medium text-richblack-5 font-mono">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600 font-mono">Email</p>
              <p className="text-sm font-medium text-richblack-5 font-mono">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600 font-mono">Gender</p>
              <p className="text-sm font-medium text-richblack-5 font-mono">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600 font-mono">Last Name</p>
              <p className="text-sm font-medium text-richblack-5 font-mono">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600 font-mono">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5 font-mono">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600 font-mono">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5 font-mono">
              
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}