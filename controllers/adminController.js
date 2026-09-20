const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// =====================================================
// ADMIN LOGIN
// POST /api/admin/login
// =====================================================

const adminLogin = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }

    // -----------------------------------------------
    // FIND ADMIN
    // -----------------------------------------------

    const admin =
      await Admin.findOne({
        email:
          email.trim().toLowerCase()
      });

    if (!admin) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }

    // -----------------------------------------------
    // CHECK ACTIVE
    // -----------------------------------------------

    if (!admin.active) {

      return res.status(403).json({

        success: false,

        message:
          "Admin account is inactive"

      });

    }

    // -----------------------------------------------
    // CHECK PASSWORD
    // -----------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }

    // -----------------------------------------------
    // GENERATE ADMIN TOKEN
    // -----------------------------------------------

    const token =
      jwt.sign(

        {
          id: admin._id,
          role: "admin"
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      );

    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    res.status(200).json({

      success: true,

      message:
        "Admin login successful",

      admin: {

        id: admin._id,

        name: admin.name,

        email: admin.email,

        role: admin.role

      },

      token

    });

  } catch (error) {

    console.error(
      "Admin Login Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        "Admin login failed",

      error:
        error.message

    });

  }

};


// =====================================================
// GET ADMIN PROFILE
// GET /api/admin/profile
// =====================================================

const getAdminProfile = async (
  req,
  res
) => {

  try {

    const admin =
      await Admin.findById(
        req.admin._id
      ).select("-password");

    if (!admin) {

      return res.status(404).json({

        success: false,

        message:
          "Admin not found"

      });

    }

    res.status(200).json({

      success: true,

      admin

    });

  } catch (error) {

    console.error(
      "Admin Profile Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to get admin profile",

      error:
        error.message

    });

  }

};


// =====================================================
// ADMIN LOGOUT
// POST /api/admin/logout
// =====================================================

const adminLogout = async (
  req,
  res
) => {

  try {

    res.status(200).json({

      success: true,

      message:
        "Admin logged out successfully"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Admin logout failed"

    });

  }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  adminLogin,

  getAdminProfile,

  adminLogout

};