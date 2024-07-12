import Navbar from "./components/common/Navbar"
import Home from "./components/core/home/Home"
import { Route, Routes } from "react-router-dom"
//import OpenRoute from "./components/common/auth/OpenRoute"
import Signup from "./pages/Signup"
import Emailverify from "./pages/Emailverify"
import Login from "./pages/Login"


function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
   
     
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-email" element={<Emailverify/>}/>
        <Route path="/login" element={<Login/>}/>
        
        
    
    </Routes>
    
    </div>
  )
}

export default App