const Location = require("../models/Location");

// ==========================================
// GET ALL LOCATIONS
// ==========================================

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find()
      .sort({ state: 1, district: 1 });

    res.status(200).json({
      success: true,
      count: locations.length,
      locations
    });

  } catch (error) {
    console.error("Get Locations Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch locations",
      error: error.message
    });
  }
};


// ==========================================
// GET STATES
// ==========================================

const getStates = async (req, res) => {
  try {
    const states = await Location.distinct("state");

    states.sort();

    res.status(200).json({
      success: true,
      count: states.length,
      states
    });

  } catch (error) {
    console.error("Get States Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch states",
      error: error.message
    });
  }
};


// ==========================================
// GET DISTRICTS BY STATE
// ==========================================

const getDistrictsByState = async (req, res) => {
  try {
    const { state } = req.params;

    const districts = await Location.find({
      state: {
        $regex: `^${state}$`,
        $options: "i"
      }
    })
      .select("district latitude longitude")
      .sort({ district: 1 });

    res.status(200).json({
      success: true,
      count: districts.length,
      districts
    });

  } catch (error) {
    console.error("Get Districts Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch districts",
      error: error.message
    });
  }
};


// ==========================================
// GET ONE LOCATION
// ==========================================

const getLocation = async (req, res) => {
  try {
    const {
      state,
      district
    } = req.params;

    const location = await Location.findOne({
      state: {
        $regex: `^${state}$`,
        $options: "i"
      },

      district: {
        $regex: `^${district}$`,
        $options: "i"
      }
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.status(200).json({
      success: true,
      location
    });

  } catch (error) {
    console.error("Get Location Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch location",
      error: error.message
    });
  }
};


module.exports = {
  getAllLocations,
  getStates,
  getDistrictsByState,
  getLocation
};