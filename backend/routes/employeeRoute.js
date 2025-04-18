import express from "express";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

// GET all employees
router.get("/getEmployees", getAllEmployees);

// POST create new employee
router.post("/addEmployee", createEmployee);

// PUT update employee
router.put("/updateEmployee/:id", updateEmployee);

// DELETE employee
router.delete("/deleteEmployee/:id", deleteEmployee);

export default router;
