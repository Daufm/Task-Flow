import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTachometerAlt, faPlusCircle, faCalendarDay, faCalendarAlt, faCheckCircle, faExclamationTriangle, faBriefcase, faUser, faShoppingCart, faHeartbeat, faMoneyBill, faCog } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
const [expanded, setExpanded] = React.useState(true);
const [task, setTask] = React.useState(false);


return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${expanded ? "w-48" : "w-12"} h-full`}>
        <div className="p-2 flex items-center justify-between h-10">
            <h2 className={`text-lg font-bold mb-0 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>Tasks</h2>
            <button className="focus:outline-none p-1" onClick={() => setExpanded((prev) => !prev)}>
                <FontAwesomeIcon icon={faArrowLeft} className={`transition-transform duration-300 bg-gray-700 ${expanded ? "" : "rotate-180"}`} />
            </button>
        </div>
        <div className=" border-b border-gray-700">
            <button onClick={() => setTask((prev) => !prev)} className={`flex cursor-pointer hover:bg-gray-700 items-center text-base font-semibold p-2 mb-0 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-1 w-3 h-3" />
                <span className="text-base">Add Task</span>
            </button>
        </div>
        <div className="mt-4">
            <ul className={`space-y-1 ${expanded ? "block" : "hidden"}`}>
                <li className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-1 w-3 h-3" />
                    <span>Dashboard</span>
                </li>
            </ul>
        </div>
        <div className="mt-2">
            <h2 className={`text-xs text-gray-400 font-bold px-1 mb-1 transition-opacity duration-300 uppercase tracking-wider ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>Filters</h2>
            <ul className={`space-y-1 ${expanded ? "block" : "hidden"}`}>
                <li className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded text-sm">
                    <FontAwesomeIcon icon={faCalendarDay} className="mr-1 w-3 h-3" />
                    <span>Today</span>
                </li>
                <li className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded text-sm">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 w-3 h-3" />
                    <span>Upcoming</span>
                </li>
                <li className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded text-sm">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-1 w-3 h-3" />
                    <span>Done</span>
                </li>
                <li className="flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded text-sm">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1 w-3 h-3" />
                    <span>Priority</span>
                </li>
            </ul>
        </div>
        <div className="mt-2">
            <h2 className={`text-xs text-gray-400 font-bold px-1 mb-1 transition-opacity duration-300 uppercase tracking-wider ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>Categories</h2>
            <ul className={`space-y-1 ${expanded ? "block" : "hidden"}`}>
                <li className="text-sm flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faBriefcase} className="mr-1 w-3 h-3" />
                    <span>Work</span>
                </li>
                <li className="text-sm flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faUser} className="mr-1 w-3 h-3" />
                    <span>Personal</span>
                </li>
                <li className="text-sm flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-1 w-3 h-3" />
                    <span>Shop</span>
                </li>
                <li className="text-sm flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faHeartbeat} className="mr-1 w-3 h-3" />
                    <span>Health</span>
                </li>
                <li className="text-sm flex items-center px-1 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faMoneyBill} className="mr-1 w-3 h-3" />
                    <span>Finance</span>
                </li>
            </ul>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-2">
            <ul className={`mb-2 space-y-1 ${expanded ? "block" : "hidden"}`}>
                <li className="flex items-center px-2 py-1 hover:bg-gray-700 cursor-pointer rounded">
                    <FontAwesomeIcon icon={faCog} className="mr-1 w-3 h-3" />
                    <span>Settings</span>
                </li>
            </ul>
        </div>
    </aside>
);
}

export default Sidebar;
