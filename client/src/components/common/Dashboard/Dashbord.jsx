import Sidebar from '../SideBar';
import { SidebarItem } from '../SideBar';
import { IoIosLogOut } from "react-icons/io";
import { GiGraduateCap } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import MyProfile from './Profile';
import Enrolled from '../../core/Dashboard/EnrolledCourse/Enrolled';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import Instructor from '../../core/Dashboard/Instructor/Instructor';
import { AiFillDashboard } from "react-icons/ai"
import { FiPlus } from "react-icons/fi";
import AddCourse from '../../core/Dashboard/Index';
import { LuPcCase } from "react-icons/lu";
import MyCourses from '../../core/Dashboard/Instructor/MyCourse';
function Dashbord() {
  const [activeComponent, setActiveComponent] = useState('MyProfile');
  const{user} = useSelector((state) => state.profile);


  const handleSidebarItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar>
        <SidebarItem
          icon={<FaUserCircle size={20}/>}
          text="My Profile"
          onClick={() => handleSidebarItemClick('MyProfile')}
        />
        {user?.accountType=== "Student" && (<><SidebarItem
          icon={<GiGraduateCap size={20}/>}
          text="Enrolled Course"
          onClick={() => handleSidebarItemClick('Enrolled')}
        /></>)}
          {user?.accountType=== "Instructor" && (<><SidebarItem
          icon={<AiFillDashboard size={20}/>}
          text="Dashbord"
          onClick={() => handleSidebarItemClick('InstructorDashboard')}
        />
        <SidebarItem
          icon={<FiPlus size={20}/>}
          text="Add Course"
          onClick={() => handleSidebarItemClick('Addcourse')}
        />
         <SidebarItem
          icon={<LuPcCase size={20}/>}
          text="My Course"
          onClick={() => handleSidebarItemClick('MyCourse')}
        />
        </>)}
        
        <SidebarItem
          icon={<IoIosLogOut size={20}/>}
          text="Logout"
          onClick={() => handleSidebarItemClick('Logout')}
        />
      </Sidebar>
      <div style={{ flex: 1 }}>
        {activeComponent === 'MyProfile' && <MyProfile />}
        {activeComponent === 'Enrolled' && <Enrolled />}
        {activeComponent === 'InstructorDashboard' && <Instructor/>}
        {activeComponent === 'Addcourse' && <AddCourse/>}
        {activeComponent === 'MyCourse' && <MyCourses handleSidebarItemClick={handleSidebarItemClick}/>}
       
      </div>
    </div>
  );
}

export default Dashbord;