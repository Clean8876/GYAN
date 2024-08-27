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



function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-y-auto">
      <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category/:catalogName" element={<Catalog/>}/>
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path="/verify-email" element={<Emailverify/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
       
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path="dashboard/add-course" element={<AddCourse/>} />
        <Route path="dashboard/enrolled" element={<Enrolled/>} />
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
    </Routes>
    
    </div>
  )
}

export default App