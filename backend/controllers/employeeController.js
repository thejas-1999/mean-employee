import Employee from "../models/employeeModel.js";

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

const deleteEmployee = async () => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json(`Employee id Deleted`);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
};

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
