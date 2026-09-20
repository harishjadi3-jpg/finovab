const express = require("express");

const {
  checkEligibility,
  getEligibilitySchemes
} = require("../controllers/eligibilityController");

const protect =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// =====================================================
// CHECK ELIGIBILITY
// =====================================================

router.post(
  "/check",
  protect,
  checkEligibility
);

// =====================================================
// GET ACTIVE SCHEMES
// =====================================================

router.get(
  "/schemes",
  protect,
  getEligibilitySchemes
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;