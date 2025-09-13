import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./db/db.js";
import Task from "./models/Task.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// Get all tasks
// GET /tasks with optional filters
app.get("/tasks", async (req, res) => {
  const { category, priority, status, date } = req.query;

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
  if (date) {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (date === "today") {
      filtered = filtered.filter((t) => t.due_date === today);
    } else if (date === "upcoming") {
      filtered = filtered.filter((t) => t.due_date > today);
    }
  }

  res.json(filtered);
});


app.post("/newtasks", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Log the incoming request body
        const { title, priority, category, due_date, due_date_time } = req.body;
        const newTask = await Task.create({ title, priority, category, due_date, due_date_time });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // await sequelize.sync(); // creates tables if not exist
});
