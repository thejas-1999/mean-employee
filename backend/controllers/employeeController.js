import Employee from "../models/employeeModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateTokens.js";

//@desc Authendicate the user and get token
//@route post api/users/login
//@access public
const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Employee.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create employee
const createEmployee = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExist = await Employee.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Employee already exist");
  }

  const user = await Employee.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
