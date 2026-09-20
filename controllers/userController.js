// =====================================================
// USER CONTROLLER
// =====================================================

const User = require("../models/User");


// =====================================================
// GET USER PROFILE
// GET /api/users/profile
// =====================================================

const getUserProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user._id
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    res.status(200).json({

      success: true,

      user

    });

  } catch (error) {

    console.error(
      "Get User Profile Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to get user profile",

      error: error.message

    });

  }

};


// =====================================================
// UPDATE USER PROFILE
// PUT /api/users/profile
// =====================================================

const updateUserProfile = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found"

      });

    }


    // -----------------------------------------------
    // UPDATE NAME
    // -----------------------------------------------

    if (
      req.body.name !== undefined
    ) {

      const name =
        String(req.body.name).trim();

      if (!name) {

        return res.status(400).json({

          success: false,

          message:
            "Name cannot be empty"

        });

      }

      user.name = name;

    }


    // -----------------------------------------------
    // UPDATE EMAIL
    // -----------------------------------------------

    if (
      req.body.email !== undefined
    ) {

      const email =
        String(req.body.email)
          .trim()
          .toLowerCase();

      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            "Email cannot be empty"

        });

      }


      // Check whether another user
      // already has this email

      const existingUser =
        await User.findOne({
          email,
          _id: {
            $ne: user._id
          }
        });

      if (existingUser) {

        return res.status(400).json({

          success: false,

          message:
            "Email already exists"

        });

      }

      user.email = email;

    }


    await user.save();


    // -----------------------------------------------
    // RETURN UPDATED USER
    // -----------------------------------------------

    const updatedUser =
      await User.findById(
        user._id
      ).select("-password");


    res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      user: updatedUser

    });

  } catch (error) {

    console.error(
      "Update User Profile Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to update profile",

      error: error.message

    });

  }

};


// =====================================================
// GET USER DASHBOARD
// GET /api/users/dashboard
// =====================================================

const getUserDashboard = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).select("-password");


    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found"

      });

    }


    res.status(200).json({

      success: true,

      message:
        "User dashboard data",

      dashboard: {

        user: {

          id: user._id,

          name: user.name,

          email: user.email

        },

        eligibility: {

          available: true,

          endpoint:
            "/api/eligibility/check"

        },

        schemes: {

          available: true,

          endpoint:
            "/api/eligibility/schemes"

        },

        offices: {

          available: true,

          endpoint:
            "/api/offices/match"

        }

      }

    });

  } catch (error) {

    console.error(
      "User Dashboard Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to load dashboard",

      error: error.message

    });

  }

};


// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {

  getUserProfile,

  updateUserProfile,

  getUserDashboard

};