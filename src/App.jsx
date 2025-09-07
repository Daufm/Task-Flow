import { useState } from 'react'
import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [count, setCount] = useState(0)

  // Import FontAwesomeIcon and filter icon

  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All Task')
  const filterOptions = [
    'All Task',
    'High Priority',
    'Medium Priority',
    'Low Priority',
    'Others'
  ]

  return (
    <div className="App h-screen flex flex-col w-full">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-8 overflow-auto bg-gray-700 ">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white text-2xl font-bold mb-2">Welcome to TaskFlow</h1>
              <p className="text-gray-300">Manage your tasks efficiently</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-48 px-3 py-2 rounded bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
                />
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
              <div>
                <label
                  className="text-white block mb-2 font-medium text-gray-700 flex items-center cursor-pointer"
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
                >
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  Filter:
                </label>
                <div className="relative">
                  <button
                    className="border border-gray-300 rounded px-3 py-2 w-40 flex items-center justify-between bg-white"
                    onClick={() => setShowFilterOptions(!showFilterOptions)}
                  >
                    {selectedFilter}
                    <span className="ml-2">
                      <FontAwesomeIcon icon={faFilter} />
                    </span>
                  </button>
                  {showFilterOptions && (
                    <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                      {filterOptions.map(option => (
                        <li
                          key={option}
                          className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedFilter === option ? 'bg-gray-200 font-bold' : ''}`}
                          onClick={() => {
                            setSelectedFilter(option)
                            setShowFilterOptions(false)
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  )
}



export default App
