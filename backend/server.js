import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./db/db.js";
import Task from "./models/Task.js";
import userRoutes from "./routes/userRoutes.js";
import TaskRoutes from "./routes/taskRoutes.js";
import path from "path";

dotenv.config({ path: path.resolve("./backend/.env") })
console.log("JWT_SECRET loaded as:", process.env.JWT_SECRET)


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



app.use("/user", userRoutes);
app.use("/taskapi", TaskRoutes); // Use the same user routes for /taskapi




const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
   sequelize.sync({ alter: true });
});
