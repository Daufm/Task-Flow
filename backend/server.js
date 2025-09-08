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
// app.get("/api/tasks", async (req, res) => {
//   const tasks = await Task.findAll();
//   res.json(tasks);
// });
app.post("/newtasks", async (req, res) => {
    try {
        const { title, priority, category, dueDate } = req.body;
        const newTask = await Task.create({ title, priority, category, dueDate });
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
