
import Task from "../models/Task.js";




export const AllTask = async (req, res) => {
     const { category, priority, status, date, search } = req.query;

  let filtered = await Task.findAll();

  if (category) {
    filtered = filtered.filter((t) => t.category === category);
  }
  if (priority) {
    filtered = filtered.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
  }
  if (status) {
    filtered = filtered.filter((t) => t.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    filtered = filtered.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (date) {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (date === "today") {
      filtered = filtered.filter((t) => t.due_date === today);
    } else if (date === "upcoming") {
      filtered = filtered.filter((t) => t.due_date > today);
    }
  }

  res.json(filtered);

}



// Create a new task// POST /newtasks
export const AddTask = async (req, res) => { 
    try {
      // console.log("Request Body:", req.body); // Log the incoming request body
        const { title, priority, category, due_date, due_date_time } = req.body;
        const newTask = await Task.create({ title, priority, category, due_date, due_date_time });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }


}

