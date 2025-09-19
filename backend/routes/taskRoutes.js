import {AllTask, AddTask, UpdateTask, EditTask ,updateTaskStatus} from "../controllers/taskController.js";
import express from "express";

const router = express.Router();


router.get("/tasks", AllTask);
router.post("/newtasks", AddTask);
router.post("/updateTask", UpdateTask);
router.post('/editTask', EditTask);
router.post("/updateTaskStatus", updateTaskStatus);




export default router;