import {AllTask, AddTask, UpdateTask, EditTask ,updateTaskStatus} from "../controllers/taskController.js";
import express from "express";
import Verification from "../middleware/Verification.js";
const router = express.Router();


router.get("/tasks", Verification, AllTask);
router.post("/newtasks", Verification, AddTask);
router.post("/updateTask", Verification, UpdateTask);
router.post('/editTask', Verification, EditTask);
router.post("/updateTaskStatus", Verification, updateTaskStatus);




export default router;