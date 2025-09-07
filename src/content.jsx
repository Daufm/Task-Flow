import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const defaultTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    due: 'Dec 15, 2024',
    priority: 'High',
    label: 'Work',
    labelColor: 'bg-red-600',
  },
  {
    id: 2,
    title: 'Review client feedback',
    due: 'Dec 12, 2024',
    priority: 'High',
    label: 'Client',
    labelColor: 'bg-blue-600',
  },
  {
    id: 3,
    title: 'Update website content',
    due: 'Dec 20, 2024',
    priority: 'Medium',
    label: 'Website',
    labelColor: 'bg-purple-600',
  },
  {
    id: 4,
    title: 'Organize desk workspace',
    due: 'Dec 25, 2024',
    priority: 'Low',
    label: 'Personal',
    labelColor: 'bg-green-600',
  },
];

const priorities = [
  { name: 'High Priority', color: 'text-red-500', key: 'High' },
  { name: 'Medium Priority', color: 'text-yellow-500', key: 'Medium' },
  { name: 'Low Priority', color: 'text-green-500', key: 'Low' },
];

function Content() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-400">Total Tasks</span>
          <span className="text-2xl font-bold mt-2">4</span>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-400">Completed</span>
          <span className="text-2xl font-bold mt-2 text-green-500">0</span>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-400">Due Soon</span>
          <span className="text-2xl font-bold mt-2 text-yellow-500">0</span>
        </div>
      </div>

    {/* Priority Sections */}
    {priorities.map(priority => (
        <div key={priority.key} className="mb-6">
            <h2 className={`font-bold text-lg mb-2 ${priority.color}`}>• {priority.name}</h2>
            {defaultTasks.filter(task => task.priority === priority.key).map(task => (
                <div key={task.id} className="bg-gray-800 rounded-lg p-4 mb-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-4" />
                        <div>
                            <span className="font-semibold text-white">{task.title}</span>
                            <div className="text-sm text-gray-400 mt-1 flex items-center">
                                <span className="mr-2">Due: {task.due}</span>
                                <span className={`px-2 py-1 rounded text-xs text-white ${task.labelColor}`}>{task.label}</span>
                            </div>
                        </div>
                    </div>
                    {/* Move icons to the right side */}
                    <div className="flex items-center ml-4">
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="text-gray-400 hover:text-white cursor-pointer mr-4"
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-gray-400 hover:text-white cursor-pointer"
                        />
                    </div>
                </div>
            ))}
        </div>
    ))}
      <footer className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Settings</a>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 font-bold">TaskFlow</span>
          <span>© 2025 TaskFlow. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default Content;
