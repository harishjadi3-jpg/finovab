const express = require("express");

const {
  getUserProfile,
  updateUserProfile,
  getUserDashboard
} = require("../controllers/userController");

const protect =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// =====================================================
// USER PROFILE
// =====================================================

router.get(
  "/profile",
  protect,
  getUserProfile
);

// =====================================================
// UPDATE USER PROFILE
// =====================================================

router.put(
  "/profile",
  protect,
  updateUserProfile
);

// =====================================================
// USER DASHBOARD
// =====================================================

router.get(
  "/dashboard",
  protect,
  getUserDashboard
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;