import Sidebar from '../SideBar';
import { SidebarItem } from '../SideBar';
import { IoIosLogOut } from "react-icons/io";
import { GiGraduateCap } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import MyProfile from './Profile';
import Enrolled from '../../core/Dashboard/EnrolledCourse/Enrolled';
import { useState } from 'react';

function Dashbord() {
  const [activeComponent, setActiveComponent] = useState('MyProfile');

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
        <SidebarItem
          icon={<GiGraduateCap size={20}/>}
          text="Enrolled Course"
          onClick={() => handleSidebarItemClick('Enrolled')}
        />
        <SidebarItem
          icon={<IoIosLogOut size={20}/>}
          text="Logout"
          onClick={() => handleSidebarItemClick('Logout')}
        />
      </Sidebar>
      <div style={{ flex: 1 }}>
        {activeComponent === 'MyProfile' && <MyProfile />}
        {activeComponent === 'Enrolled' && <Enrolled />}
       
      </div>
    </div>
  );
}

export default Dashbord;