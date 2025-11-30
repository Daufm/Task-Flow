import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTask from "./addTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTachometerAlt,
  faCalendarDay,
  faCalendarAlt,
  faCheckCircle,
  faExclamationTriangle,
  faBriefcase,
  faUser,
  faShoppingCart,
  faHeartbeat,
  faMoneyBill,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {

  const [expanded, setExpanded] = useState(true);
  const [task, setTask] = useState(false);
  const navigate = useNavigate();

  const categoryRoutes = {
    Work: { path: "/cat?category=Work", icon: faBriefcase },
    Personal: { path: "/cat?category=Personal", icon: faUser },
    Shopping: { path: "/cat?category=Shopping", icon: faShoppingCart },
    Health: { path: "/cat?category=Health", icon: faHeartbeat },
    Finance: { path: "/cat?category=Finance", icon: faMoneyBill },
    Education: { path: "/cat?category=Education", icon: faBriefcase },
    Others: { path: "/cat?category=Others", icon: faBriefcase },
  };

  const filterRoutes = [
    { name: "Today", path: "/filter?date=today", icon: faCalendarDay },
    { name: "Upcoming", path: "/filter?date=upcoming", icon: faCalendarAlt },
    { name: "Done", path: "/filter?status=done", icon: faCheckCircle },
    { name: "Priority", path: "/filter?priority=high", icon: faExclamationTriangle },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return ( 
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 ${
        expanded ? "w-48" : "w-12"
      } h-full relative`}
    >
      {/* Header */}
      <div className="p-2 flex items-center justify-between h-10">
        <h2
          className={`text-lg font-bold mb-0 transition-opacity duration-300 ${
            expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Tasks
        </h2>
        <button
          className="focus:outline-none p-1"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`transition-transform duration-300 bg-gray-700 ${
              expanded ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Add Task */}
      <div className="relative">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white border rounded px-3 py-2 w-40 flex items-center justify-between shadow transition duration-150 ${expanded ? "" : "opacity-0 w-0 overflow-hidden"}`}
          onClick={() => setTask((prev) => !prev)}
        >
          <span className="font-semibold">+ Add New Task</span>
        </button>
        {task && (
          <div className="fixed top-16 right-8 w-72 bg-transparent text-black rounded shadow-lg z-50 p-4">
            <AddTask setTask={setTask} />
          </div>
        )}
      </div>

      {/* Dashboard */}
      <div className="mt-4">
        <ul className={`${expanded ? "block" : "hidden"}`}>
          <li
            onClick={() => handleNavigate("/dashboard")}
            className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded"
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-1 w-3 h-3" />
            <span>Dashboard</span>
          </li>
        </ul>
      </div>

      {/* Filters */}
      <div className="mt-2">
        <h2
          className={`text-xs text-gray-400 font-bold px-1 mb-1 uppercase tracking-wider ${
            expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Filters
        </h2>
        <ul className={`${expanded ? "block" : "hidden"} space-y-1`}>
          {filterRoutes.map((filter) => (
            <li
              key={filter.name}
              onClick={() => handleNavigate(filter.path)}
              className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded text-sm"
            >
              <FontAwesomeIcon icon={filter.icon} className="mr-1 w-3 h-3" />
              <span>{filter.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="mt-2">
        <h2
          className={`text-xs text-gray-400 font-bold px-1 mb-1 uppercase tracking-wider ${
            expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Categories
        </h2>
        <ul className={`${expanded ? "block" : "hidden"} space-y-1`}>
          {Object.entries(categoryRoutes).map(([name, { path, icon }]) => (
            <li
              key={name}
              onClick={() => handleNavigate(path)}
              className="text-sm flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded"
            >
              <FontAwesomeIcon icon={icon} className="mr-1 w-3 h-3" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-gray-700 pt-2">
        <ul className={`${expanded ? "block" : "hidden"} mb-2`}>
          <li
            onClick={() => handleNavigate("/settings")}
            className="flex items-center px-2 py-1 hover:bg-gray-700 cursor-pointer rounded"
          >
            <FontAwesomeIcon icon={faCog} className="mr-1 w-3 h-3" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
