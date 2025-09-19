import {AllTask, AddTask, UpdateTask, EditTask} from "../controllers/taskController.js";
import express from "express";

const router = express.Router();


router.get("/tasks", AllTask);
router.post("/newtasks", AddTask);
router.post("/updateTask", UpdateTask);
router.post('/editTask', EditTask);




export default router;