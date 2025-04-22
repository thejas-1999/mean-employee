import Employee from "../models/employeeModel.js";
import PerformanceReview from "../models/perfomanceReview.js";

//get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Delete reviews where employee is reviewer or reviewee
    await PerformanceReview.deleteMany({
      $or: [{ reviewer: employeeId }, { reviewee: employeeId }],
    });

    // Delete the employee
    await Employee.findByIdAndDelete(employeeId);

    res.json({ message: "Employee and related reviews deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
