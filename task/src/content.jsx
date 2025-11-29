import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // safer

const priorities = [
  { name: "High", color: "text-red-500" },
  { name: "Medium", color: "text-yellow-500" },
  { name: "Low", color: "text-green-500" },
];

const categoryColor = [
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Shopping", color: "bg-purple-500" },
  { name: "Health", color: "bg-red-500" },
  { name: "Finance", color: "bg-yellow-500" },
  { name: "Education", color: "bg-teal-500" },
  { name: "Others", color: "bg-gray-500" },
];

 const categories = [
      'Work',
      'Personal',
      'Shopping',
      'Health',
      'Finance',
      'Education',
      'Others'
    ];

function Content() {
  const [tasks, setTasks] = useState([]);
  
  const [searchParams] = useSearchParams();
 const [taskEdit, setTaskEdit] = useState(false);
 const [editedTask, setEditedTask] = useState({});
 
const token = localStorage.getItem('token') || sessionStorage.getItem('token');


const handleCheck = (e, task) => {
  const newStatus = e.target.checked ? "done" : "pending";
  axios.post(`${API_URL}/taskapi/updateTaskStatus`, {
    id: task.id,
    status: newStatus
  },{
    headers: {Authorization: `Bearer ${token}`}
  })
  .then((response) => {
    toast.success(response.data.message || "Task updated successfully");
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t
      )
    );
  })
  .catch((error) => {
    console.error("Error updating task:", error);
    toast.error("Error updating task!");
  });
};



const handleTaskDelete = (task) => {
  axios.post(`${API_URL}/taskapi/updateTask`, {
    id: task.id,
    status: "done"
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then((response) => {
     toast.success(response.data.message || "Task updated successfully");
     // Optionally refetch tasks here
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));

  })
  .catch((error) => {
    console.error("Error updating task:", error);
    toast.error("Error updating task!");
  });
};

// Handle Edit Task
const handleEditTask = (e) => {
  e.preventDefault();
  setTaskEdit(false);
  axios.post(`${API_URL}/taskapi/editTask`,
     {
      id: editedTask.id,
      editedTask
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
    .then((response) => {
      toast.success(response.data.message || "Task edited successfully");
      // Refetch tasks (include auth header so protected route succeeds)
      axios
        .get(`${API_URL}/taskapi/tasks`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setTasks(Array.isArray(response.data) ? response.data : []);
        })
        .catch((err) => {
          console.error('Error refetching tasks after edit:', err);
        });
    })
    .catch((error) => {
      console.error("Error editing task:", error);
      toast.error("Error editing task!");
    });
};


  const category = searchParams.get("category"); // e.g. "Work"
  const date = searchParams.get("date"); // e.g. "today", "upcoming"
  const status = searchParams.get("status"); // e.g. "done"
  const priority = searchParams.get("priority"); // e.g. "high"
  const search = searchParams.get("search"); // e.g. "meeting"

  useEffect(() => {
    // build query params dynamically
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (date) query.append("date", date);
    if (status) query.append("status", status);
    if (priority) query.append("priority", priority);
    if (search) query.append("search", search);

    axios
      .get(`${API_URL}/taskapi/tasks?${query.toString()}`,
    {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => {
        setTasks(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [search, category, date, status, priority]);

  
  // Listen for manual refresh events (e.g., after AddTask creates a task)
  useEffect(() => {
    const handler = () => {
      // Reuse the same fetch logic, without search params
      axios
        .get(`${API_URL}/taskapi/tasks`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setTasks(Array.isArray(response.data) ? response.data : []);
        })
        .catch((err) => {
          console.error('Error refreshing tasks from event:', err);
        });
    };

    window.addEventListener('tasks:refresh', handler);
    return () => window.removeEventListener('tasks:refresh', handler);
  }, [token]);

  const totalTask = tasks.length;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-400">Total Tasks</span>
          <span className="text-2xl font-bold mt-2">{totalTask}</span>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-400">Completed</span>
          <span className="text-2xl font-bold mt-2 text-green-500">
            {tasks.filter((t) => t.status === "done").length}
          </span>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-400">Due Soon</span>
          <span className="text-2xl font-bold mt-2 text-yellow-500">
            {tasks.filter((t) => t.due_soon).length}
          </span>
        </div>
      </div>

      {/* Priority Sections */}
      {priorities.map((priority) => {
        const filteredTasks = tasks.filter((task) => task.priority === priority.name);
        // if there is not task
        if (filteredTasks.length === 0) return (
          <div key={priority.name} className="mb-6">
            <h2 className={`font-bold text-lg mb-2 ${priority.color}`}>
              • {priority.name}
            </h2>
            <div className="text-gray-400 italic">There are no tasks in this priority</div>
          </div>
        ); // Show a message if no tasks in this priority
        return (
          <div key={priority.name} className="mb-6">
            <h2 className={`font-bold text-lg mb-2 ${priority.color}`}>
              • {priority.name}
            </h2>
            {tasks
            .filter((task) => task.priority === priority.name)
            .map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 rounded-lg p-4 mb-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                 <input
                    checked={task.status === "done"}
                    onChange={(e) => {handleCheck(e , task)}}
                    type="checkbox"
                    className="mr-4"
                  />
                  <div>
                    <span className="font-semibold text-white">
                      {task.title}
                    </span>
                    <div className="text-sm text-gray-400 mt-1 flex items-center">
                      {task.due_date && (
                        <span className="mr-2">Due: {task.due_date}</span>
                      )}
                      {task.due_date_time && (
                        <span className="mr-2">At: {task.due_date_time}</span>
                      )}
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${
                          categoryColor.find(
                            (cat) => cat.name === task.category
                          )?.color || "bg-gray-500"
                        }`}
                      >
                        {task.category}
                      </span>

                      <span className="font-semibold text-white pl-10">
                         {task.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center ml-4">
                  <FontAwesomeIcon
                    onClick={() => {setTaskEdit(true); setEditedTask(task);}}
                    icon={faEdit}
                    className="text-gray-400 hover:text-white cursor-pointer mr-4"
                  />
                  <FontAwesomeIcon
                    onClick={() => {handleTaskDelete(task);
                  }}
                    icon={faTrash}
                    className="text-gray-400 hover:text-white cursor-pointer"
                  />
                </div>
                {taskEdit && ( 
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                    <form onSubmit={handleEditTask}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={editedTask.title}
                          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Due Date</label>
                        <input type="date"
                          value={editedTask.due_date}
                          onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full"
                          />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Due Time</label>
                        <input
                          type="time"
                          value={editedTask.due_date_time}
                          onChange={(e) => setEditedTask({ ...editedTask, due_date_time: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={editedTask.category}
                          onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Priority</label>
                        <select
                          value={editedTask.priority}
                          onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                          className="border border-gray-300 rounded-lg p-2 w-full"
                        >
                          <option value="">Select a priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>

                        </select>
                      </div>

                      <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                          Save
                        </button>
                        <button
                          type="button"
                          className="ml-2 bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                          onClick={() => setTaskEdit(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                )}
              </div>
            ))}
        </div>
      );
      })}

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="#" className="hover:text-blue-400">
            About
          </a>
          <a href="#" className="hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400">
            Terms of Service
          </a>
          <a href="/settings" className="hover:text-blue-400">
            Settings
          </a>
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
