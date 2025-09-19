import {AllTask, AddTask} from "../controllers/taskController.js";
import express from "express";

const router = express.Router();


router.get("/tasks", AllTask);
router.post("/newtasks", AddTask);




export default router;