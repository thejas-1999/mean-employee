import express from "express";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

// GET all employees
router.get("/get", getAllEmployees);

// POST create a new employee
router.post("/add", createEmployee);

// PUT update an employee
router.put("/update/:id", updateEmployee);

// DELETE an employee
router.delete("/delete/:id", deleteEmployee);

export default router;
