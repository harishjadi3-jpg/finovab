const express = require("express");

const {
  getAllLocations,
  getStates,
  getDistrictsByState,
  getLocation
} = require("../controllers/locationController");

const router = express.Router();


// Get all locations
router.get("/", getAllLocations);


// Get all states
router.get("/states", getStates);


// Get districts by state
router.get("/state/:state", getDistrictsByState);


// Get specific state + district
router.get(
  "/state/:state/district/:district",
  getLocation
);


module.exports = router;