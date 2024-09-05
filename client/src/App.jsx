import Navbar from "./components/common/Navbar"
import Home from "./components/core/home/Home"
import { Route, Routes } from "react-router-dom"
//import OpenRoute from "./components/common/auth/OpenRoute"
import Signup from "./pages/Signup"
import Emailverify from "./pages/Emailverify"
import Login from "./pages/Login"
import Catalog from "./pages/Catalog"
import OpenRoute from "./components/common/auth/OpenRoute"
import PrivateRoute from "./components/common/auth/PrivateRoute"
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from "./pages/Viewcourse"
import AddCourse from "./components/core/Dashboard/Index"
import Enrolled from "./components/core/Dashboard/EnrolledCourse/Enrolled"
import VideoDetails from "./components/common/course/VideoDetails"
import Dashbord from "./components/common/Dashboard/Dashbord"
import MyProfile from "./components/common/Dashboard/Profile"
import { ACCOUNT_TYPE } from "./utils/constants"
import { useSelector } from "react-redux"
import Instructor from "./components/core/Dashboard/Instructor/Instructor"
import EditCourse from "./components/core/Dashboard/Instructor/Editcourse"
import ForgotPassword from "./pages/Forgot"
import UpdatePassword from "./pages/Updatepass"




function App() {
const {user} = useSelector((state)=> state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-y-auto">
      <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/forgetPassword" element={<ForgotPassword/>}/>
        <Route path="/category/:catalogName" element={<Catalog/>}/>
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path="/verify-email" element={<Emailverify/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route
          path="changePassword/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        /> 
       
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
        
        <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
        
        <Route path="view-course/:courseId" element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>
        {/* Nested Routes */}
        <Route 
          path="section/:sectionId/sub-section/:subSectionId" 
          element={<VideoDetails />} 
        />
      </Route>
      <Route path="dashboard" element={<PrivateRoute> <Dashbord/> </PrivateRoute>}>
  <Route path="profile" element={<MyProfile/>} />
  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <Route path="enrolled" element={<Enrolled/>} />
  )}
  {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    <><Route path="instructor" element={<Instructor/>} />
    <Route path="add-course" element={<AddCourse/>} />
    </>
    
  )}
</Route>

    </Routes> 
    
    </div>
  )
}

export default App