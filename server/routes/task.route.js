import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTask);
router.get("/:id", getSingleTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
