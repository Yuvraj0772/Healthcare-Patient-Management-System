const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Staff
const registerStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Check if staff already exists
    const existingStaff = await Staff.findOne({ email });

    if (existingStaff) {
      return res.status(409).json({
        success: false,
        message: "Staff with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create staff
    const staff = await Staff.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// Login Staff
const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find staff by email
    const staff = await Staff.findOne({
      email: email.trim().toLowerCase(),
    });

    console.log("Staff found:", !!staff);

    if (!staff) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(
      password,
      staff.password
    );

    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: staff._id,
        role: staff.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    });

  } catch (error) {
  console.error("Login Error:", error);

  res.status(500).json({
    success: false,
    message: "Login failed",
  });
}

  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Login failed",
  //   });
  // }
};

module.exports = { registerStaff, loginStaff };