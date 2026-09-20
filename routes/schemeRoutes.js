const express = require("express");

const {
  addScheme,
  getAllSchemes,
  getActiveSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme
} = require("../controllers/schemeController");

const adminProtect =
  require("../middleware/adminMiddleware");

const router = express.Router();


// =====================================================
// PUBLIC / USER SCHEME READ ROUTES
// =====================================================

router.get(
  "/",
  getAllSchemes
);

router.get(
  "/active",
  getActiveSchemes
);

router.get(
  "/:id",
  getSchemeById
);


// =====================================================
// ADMIN SCHEME MANAGEMENT
// =====================================================

// Add scheme
router.post(
  "/",
  adminProtect,
  addScheme
);


// Update scheme
router.put(
  "/:id",
  adminProtect,
  updateScheme
);


// Delete scheme
router.delete(
  "/:id",
  adminProtect,
  deleteScheme
);


module.exports = router;