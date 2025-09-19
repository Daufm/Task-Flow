import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBell, faPalette, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const initialCategories = [
  "Work",
  "Personal",
  "Health & Fitness"
];

function Setting() {
  const [activeTab, setActiveTab] = useState("profile");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 min-h-screen text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-gray-300 mb-6">Manage your profile, preferences, and account settings.</p>

        {/* Tabs */}
        <div className="flex bg-gray-800 rounded mb-6 overflow-hidden">
          <button
            className={`flex-1 py-2 px-4 font-semibold flex items-center justify-center transition-colors ${
              activeTab === "profile" ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
          </button>
          <button
            className={`flex-1 py-2 px-4 font-semibold flex items-center justify-center transition-colors ${
              activeTab === "password" ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("password")}
          >
            <FontAwesomeIcon icon={faLock} className="mr-2" /> Password
          </button>
        </div>

        {/* Application Preferences */}
        <div className="bg-gray-800 rounded p-6 mb-6">
          <h2 className="font-bold mb-4">Application Preferences</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold flex items-center">
                <FontAwesomeIcon icon={faBell} className="mr-2" />
                Email Notifications
              </div>
              <div className="text-gray-400 text-sm">Receive an email when tasks are due.</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
              <div className={`absolute ml-1 mt-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${emailNotifications ? "translate-x-5" : ""}`}></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold flex items-center">
                <FontAwesomeIcon icon={faPalette} className="mr-2" />
                Application Theme
              </div>
              <div className="text-gray-400 text-sm">Choose your preferred interface theme.</div>
            </div>
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className="bg-gray-700 text-white rounded px-3 py-1"
            >
              <option value="dark">Dark (Default)</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        {/* Manage Task Categories */}
        <div className="bg-gray-800 rounded p-6">
          <h2 className="font-bold mb-4">Manage Task Categories</h2>
          <div className="space-y-2 mb-4">
            {categories.map(cat => (
              <div key={cat} className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded">
                <span className="font-semibold">{cat}</span>
                <div className="space-x-2">
                  <button className="text-yellow-400 hover:text-yellow-300">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => handleDeleteCategory(cat)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="Add New Category"
              className="bg-gray-700 text-white rounded px-3 py-1 flex-1"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded font-semibold"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;