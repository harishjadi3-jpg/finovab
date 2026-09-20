const Location = require("../models/Location");
const Office = require("../models/Office");

const calculateDistance =
  require("./distanceService");


// =====================================================
// FIND MATCHING OFFICES
// =====================================================

const findMatchingOffices = async (
  state,
  district
) => {

  // ---------------------------------------------------
  // Find user's district coordinates
  // ---------------------------------------------------

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

    return {
      success: false,
      message: "District location not found",
      offices: []
    };
  }


  // ---------------------------------------------------
  // Find active offices in the same state
  // ---------------------------------------------------

  const offices = await Office.find({
    state: {
      $regex: `^${state}$`,
      $options: "i"
    },

    active: true
  });


  // ---------------------------------------------------
  // Calculate distance
  // ---------------------------------------------------

  const officesWithDistance = offices
    .filter(
      office =>
        office.latitude !== null &&
        office.longitude !== null
    )
    .map(office => {

      const distance =
        calculateDistance(
          location.latitude,
          location.longitude,
          office.latitude,
          office.longitude
        );

      return {
        office,
        distanceKm: distance
      };
    });


  // ---------------------------------------------------
  // Sort nearest first
  // ---------------------------------------------------

  officesWithDistance.sort(
    (a, b) =>
      a.distanceKm - b.distanceKm
  );


  return {
    success: true,

    userLocation: {
      state: location.state,
      district: location.district,
      latitude: location.latitude,
      longitude: location.longitude
    },

    count: officesWithDistance.length,

    offices: officesWithDistance
  };
};


module.exports = {
  findMatchingOffices
};