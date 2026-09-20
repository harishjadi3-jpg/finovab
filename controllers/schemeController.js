const LoanScheme = require("../models/LoanScheme");

// ==========================================
// ADD SCHEME
// ==========================================

const addScheme = async (req, res) => {
  try {
    const {
      schemeCode,
      schemeName,
      shortName,
      provider,
      providerType,
      status,
      description,
      purpose,
      eligibility,
      financial,
      repayment,
      eligibleChannels,
      channelPartnerCategories,
      business,
      application,
      requiredDocuments,
      documentNote,
      availability,
      source
    } = req.body;

    // Required fields
    if (!schemeCode || !schemeName || !provider) {
      return res.status(400).json({
        success: false,
        message: "schemeCode, schemeName and provider are required"
      });
    }

    // Check duplicate scheme code
    const existingScheme = await LoanScheme.findOne({
      schemeCode: schemeCode.trim()
    });

    if (existingScheme) {
      return res.status(400).json({
        success: false,
        message: "A scheme with this scheme code already exists"
      });
    }

    // Create scheme
    const scheme = await LoanScheme.create({
      schemeCode,
      schemeName,
      shortName,
      provider,
      providerType,
      status,
      description,
      purpose,
      eligibility,
      financial,
      repayment,
      eligibleChannels,
      channelPartnerCategories,
      business,
      application,
      requiredDocuments,
      documentNote,
      availability,
      source
    });

    res.status(201).json({
      success: true,
      message: "Scheme added successfully",
      scheme
    });

  } catch (error) {
    console.error("Add Scheme Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add scheme",
      error: error.message
    });
  }
};


// ==========================================
// GET ALL SCHEMES
// ==========================================

const getAllSchemes = async (req, res) => {
  try {
    const schemes = await LoanScheme.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: schemes.length,
      schemes
    });

  } catch (error) {
    console.error("Get Schemes Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch schemes",
      error: error.message
    });
  }
};


// ==========================================
// GET ACTIVE SCHEMES
// ==========================================

const getActiveSchemes = async (req, res) => {
  try {
    const schemes = await LoanScheme.find({
      status: "ACTIVE"
    }).sort({
      schemeName: 1
    });

    res.status(200).json({
      success: true,
      count: schemes.length,
      schemes
    });

  } catch (error) {
    console.error("Get Active Schemes Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch active schemes",
      error: error.message
    });
  }
};


// ==========================================
// GET SINGLE SCHEME
// ==========================================

const getSchemeById = async (req, res) => {
  try {
    const scheme = await LoanScheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found"
      });
    }

    res.status(200).json({
      success: true,
      scheme
    });

  } catch (error) {
    console.error("Get Scheme Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch scheme",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE SCHEME
// ==========================================

const updateScheme = async (req, res) => {
  try {
    const scheme = await LoanScheme.findById(
      req.params.id
    );

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found"
      });
    }

    const updatedScheme = await LoanScheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Scheme updated successfully",
      scheme: updatedScheme
    });

  } catch (error) {
    console.error("Update Scheme Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update scheme",
      error: error.message
    });
  }
};


// ==========================================
// DELETE SCHEME
// ==========================================

const deleteScheme = async (req, res) => {
  try {
    const scheme = await LoanScheme.findById(
      req.params.id
    );

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found"
      });
    }

    await LoanScheme.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Scheme deleted successfully"
    });

  } catch (error) {
    console.error("Delete Scheme Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete scheme",
      error: error.message
    });
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  addScheme,
  getAllSchemes,
  getActiveSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme
};