import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook ,faCog,faHome,faSearch } from '@fortawesome/free-solid-svg-icons';


function Navbar() {

    // const [searchTerm, setSearchTerm] = React.useState("");
    const navigate = useNavigate();

    const handleSearch=(event)=>{
        navigate(`/?search=${event.target.value}`);
    }

    

    return (
        <nav className="bg-gray-800 text-white px-6 py-2 flex items-center w-full">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-2 min-w-max">
                <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-bold text-blue-500">TaskFlow</span>
            </div>

            {/* Center: Navigation Links */}
            <ul className="flex-1 flex items-center justify-center space-x-6">
                <li className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-gray-300" />
                    <a href="#" className="text-sm font-medium text-gray-200 hover:text-blue-400">Dashboard</a>
                </li>
                <li className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faCog} className="w-4 h-4 text-gray-300" />
                    <a href="#" className="text-sm font-medium text-gray-200 hover:text-blue-400">Settings</a>
                </li>
            </ul>

            {/* Right: Search and Auth Buttons */}
            <div className="flex items-center space-x-3 min-w-max">
                <div className="relative">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search tasks..."
                        className="w-40 px-3 py-1 rounded bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
                    />
                    <FontAwesomeIcon icon={faSearch} className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                </div>
                <button onClick={()=>{}} className="bg-transparent text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-700">Log In</button>
                <button onClick={()=>{}} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">Sign Up</button>
            </div>
        </nav>
    );
}


export default Navbar;