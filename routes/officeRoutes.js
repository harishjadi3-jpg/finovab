const express = require("express");

const {
  addOffice,
  getAllOffices,
  getOfficesByState,
  getOfficesByDistrict,
  getOfficeById,
  updateOffice,
  deleteOffice,
  findMatchingOfficeController
} = require("../controllers/officeController");

const router = express.Router();

// =====================================================
// ADD OFFICE
// POST /api/offices
// =====================================================
router.post("/", addOffice);

// =====================================================
// GET ALL OFFICES
// GET /api/offices
// =====================================================
router.get("/", getAllOffices);

// =====================================================
// GET OFFICES BY STATE
// GET /api/offices/state/Telangana
// =====================================================
router.get(
  "/state/:state",
  getOfficesByState
);

// =====================================================
// GET OFFICES BY STATE + DISTRICT
// GET /api/offices/state/Telangana/district/Hyderabad
// =====================================================
router.get(
  "/state/:state/district/:district",
  getOfficesByDistrict
);

// =====================================================
// FIND MATCHING / NEAREST OFFICES
// GET /api/offices/match?state=Telangana&district=Hyderabad
// =====================================================
router.get(
  "/match",
  findMatchingOfficeController
);

// =====================================================
// GET OFFICE BY ID
// GET /api/offices/:id
// =====================================================
router.get(
  "/:id",
  getOfficeById
);

// =====================================================
// UPDATE OFFICE
// PUT /api/offices/:id
// =====================================================
router.put(
  "/:id",
  updateOffice
);

// =====================================================
// DELETE OFFICE
// DELETE /api/offices/:id
// =====================================================
router.delete(
  "/:id",
  deleteOffice
);

module.exports = router;