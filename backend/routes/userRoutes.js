import {signup , login, verify} from "../controllers/userController.js";
import express from "express";


const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verify);
router.post("/login", login);


export default router;