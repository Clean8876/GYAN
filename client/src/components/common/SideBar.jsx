/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (identifier) => {
    setActiveItem(identifier); // Set the clicked item as active
  };

  return (
    <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-width duration-300`}>
      <nav className="h-full flex flex-col shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center bg-black-700">
          <h1 className="text-gray-600 font-popo font-extrabold text-lg">
            {expanded ? "Dashboard" : "DB"}
          </h1>
        </div>

        <SidebarContext.Provider value={{ expanded, activeItem, handleItemClick }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, onClick }) {
  const { expanded, activeItem, handleItemClick } = useContext(SidebarContext);

  const handleClick = () => {
    handleItemClick(text); // Update active item in the context
    onClick(); // Call the onClick function passed from Dashbord component
  };

  return (
    <li
      onClick={handleClick}
      className={`relative flex items-center py-2 px-3 my-1 font-medium cursor-pointer transition-colors group
        ${activeItem === text ? "bg-orange-200 text-orange-500" : "text-gray-800"}`}
    >
      {icon}
      <span className="w-full ml-3 font-mono">{text}</span>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-orange-200 text-gray-900 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-mono">
          {text}
        </div>
      )}
    </li>
  );
}