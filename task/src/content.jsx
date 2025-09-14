import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

function Content() {
  const [tasks, setTasks] = useState([]);
  const [searchParams] = useSearchParams();

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
      .get(`${API_URL}/tasks?${query.toString()}`)
      .then((response) => {
        setTasks(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [search, category, date, status, priority]);

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
                  <input type="checkbox" className="mr-4" />
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
                    </div>
                  </div>
                </div>

                {/* Actions */}
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
          <a href="#" className="hover:text-blue-400">
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
