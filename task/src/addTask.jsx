import React, { useState } from 'react'
import axios from 'axios'



function AddTask({ setTask }) {
  // Logic to add the task
 

    const categories = [
      'Work',
      'Personal',
      'Shopping',
      'Health',
      'Finance',
      'Education',
      'Others'
    ]
  
    const [taskname, setTaskname] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [category, setCategory] = useState('Others')
    const [dueDate, setDueDate] = useState('')
    const [dueDateTime, setDueDateTime] = useState('')
   
   
    function handleAddTask(e) {

    e.preventDefault();

    // Here you would typically handle the form submission,
    const formattedTime = dueDateTime.length === 5 ? dueDateTime + ':00' : dueDateTime;
    const newTask = {
      title: taskname,
      priority,
      category,
      due_date: dueDate,
      due_date_time: formattedTime
    }
    
    setTask(false)
    // reset form fileds
    setTaskname('')
    setPriority('Medium')
    setCategory('Others')
    setDueDate('')
    setDueDateTime('')

    // e.g., by sending the task data to your backend API.
    console.log('New Task Added:', newTask)

    axios.post('http://localhost:5000/taskapi/newtasks', newTask)
      .then(response => {
        console.log('Task added successfully:', response.data)
      })
      .catch(error => {
        console.error('Error adding task:', error)
      })

  }

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-2xl p-6 z-20">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h3>
                    <form className="space-y-4" onSubmit={handleAddTask}>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                    <input 
                    type="text" 
                    value={taskname} 
                    onChange={(e) => setTaskname(e.target.value)} 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Enter task name"
                    required
                    />
                    </div>
                    <div className="flex space-x-2">
                    <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                    </div>
                    <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((category) => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                        ))}
                    </select>
                    </div>
                    </div>
                    <div className="flex space-x-2">
                    <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>
                    <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Time</label>
                    <input 
                        type="time" 
                        value={dueDateTime} 
                        onChange={(e) => setDueDateTime(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                    <button 
                    type="button" 
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition"
                    onClick={() => setTask(false)}
                    >
                    Cancel
                    </button>
                    <button 
                    type="submit" 
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-medium transition"
                    >
                    Add Task
                    </button>
                    </div>
                    </form>
                </div>

    )
}

export default AddTask;
