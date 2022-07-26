import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateById,
  deleteById,
} from "../controllers/index.js";
import hanldeError from "../middleware/index.js";

const routes = new Router();

// Add routes
routes.get("/", hanldeError(getAllTasks)).post("/", hanldeError(createTask));
routes
  .get("/:id", hanldeError(getTaskById))
  .put("/:id", hanldeError(updateById))
  .delete("/:id", hanldeError(deleteById));

export default routes;
