const Office = require("../models/Office");
const {
  findMatchingOffices
} = require("../services/officeMatchingService");
// =====================================================
// ADD OFFICE
// =====================================================

const addOffice = async (req, res) => {
  try {
    const {
      name,
      category,
      state,
      district,
      address,
      latitude,
      longitude,
      phone,
      email,
      website,
      active
    } = req.body;

    if (!name || !category || !state) {
      return res.status(400).json({
        success: false,
        message: "Name, category and state are required"
      });
    }

    const office = await Office.create({
      name,
      category,
      state,
      district,
      address,
      latitude,
      longitude,
      phone,
      email,
      website,
      active
    });

    res.status(201).json({
      success: true,
      message: "Office added successfully",
      office
    });

  } catch (error) {
    console.error("Add Office Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add office",
      error: error.message
    });
  }
};


// =====================================================
// GET ALL OFFICES
// =====================================================

const getAllOffices = async (req, res) => {
  try {
    const offices = await Office.find()
      .sort({ state: 1, district: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: offices.length,
      offices
    });

  } catch (error) {
    console.error("Get Offices Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch offices",
      error: error.message
    });
  }
};


// =====================================================
// GET OFFICES BY STATE
// =====================================================

const getOfficesByState = async (req, res) => {
  try {
    const { state } = req.params;

    const offices = await Office.find({
      state: {
        $regex: `^${state}$`,
        $options: "i"
      },
      active: true
    }).sort({
      district: 1,
      name: 1
    });

    res.status(200).json({
      success: true,
      count: offices.length,
      offices
    });

  } catch (error) {
    console.error("Get State Offices Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch offices",
      error: error.message
    });
  }
};


// =====================================================
// GET OFFICES BY STATE + DISTRICT
// =====================================================

const getOfficesByDistrict = async (req, res) => {
  try {
    const {
      state,
      district
    } = req.params;

    const offices = await Office.find({
      state: {
        $regex: `^${state}$`,
        $options: "i"
      },

      district: {
        $regex: `^${district}$`,
        $options: "i"
      },

      active: true

    }).sort({
      name: 1
    });

    res.status(200).json({
      success: true,
      count: offices.length,
      offices
    });

  } catch (error) {
    console.error("Get District Offices Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch district offices",
      error: error.message
    });
  }
};


// =====================================================
// GET OFFICE BY ID
// =====================================================

const getOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found"
      });
    }

    res.status(200).json({
      success: true,
      office
    });

  } catch (error) {
    console.error("Get Office Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch office",
      error: error.message
    });
  }
};


// =====================================================
// UPDATE OFFICE
// =====================================================

const updateOffice = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found"
      });
    }

    const updatedOffice =
      await Office.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.status(200).json({
      success: true,
      message: "Office updated successfully",
      office: updatedOffice
    });

  } catch (error) {
    console.error("Update Office Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update office",
      error: error.message
    });
  }
};


// =====================================================
// DELETE OFFICE
// =====================================================

const deleteOffice = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found"
      });
    }

    await Office.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Office deleted successfully"
    });

  } catch (error) {
    console.error("Delete Office Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete office",
      error: error.message
    });
  }
};

// =====================================================
// FIND MATCHING / NEAREST OFFICES
// =====================================================

const findMatchingOfficeController = async (req, res) => {

  try {

    const {
      state,
      district
    } = req.query;


    if (!state || !district) {

      return res.status(400).json({
        success: false,
        message: "State and district are required"
      });
    }


    const result =
      await findMatchingOffices(
        state,
        district
      );


    if (!result.success) {

      return res.status(404).json(result);
    }


    res.status(200).json(result);

  } catch (error) {

    console.error(
      "Office Matching Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to find matching offices",
      error: error.message
    });
  }
};
module.exports = {
  addOffice,
  getAllOffices,
  getOfficesByState,
  getOfficesByDistrict,
  getOfficeById,
  updateOffice,
  deleteOffice,
  findMatchingOfficeController
};