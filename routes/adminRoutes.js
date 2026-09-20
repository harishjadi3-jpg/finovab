const express = require("express");

const {
  adminLogin,
  getAdminProfile,
  adminLogout
} = require("../controllers/adminController");

const adminProtect =
  require("../middleware/adminMiddleware");

const router = express.Router();

// =====================================================
// ADMIN LOGIN
// =====================================================

router.post(
  "/login",
  adminLogin
);

// =====================================================
// ADMIN PROFILE
// =====================================================

router.get(
  "/profile",
  adminProtect,
  getAdminProfile
);

// =====================================================
// ADMIN LOGOUT
// =====================================================

router.post(
  "/logout",
  adminProtect,
  adminLogout
);

module.exports = router;