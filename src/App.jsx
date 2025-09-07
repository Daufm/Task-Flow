import { useState } from 'react'
import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App h-screen flex flex-col w-full">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  )
}



export default App
