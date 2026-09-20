const LoanScheme = require("../models/LoanScheme");

// =====================================================
// CHECK AGE
// =====================================================

const checkAge = (
  scheme,
  age
) => {

  const eligibility =
    scheme.eligibility || {};

  // ELS / schemes with no minimum age
  if (
    eligibility.ageRule ===
    "NO_MINIMUM_AGE"
  ) {

    if (
      eligibility.maxAge !== null &&
      eligibility.maxAge !== undefined &&
      age > eligibility.maxAge
    ) {

      return {
        eligible: false,
        reason:
          `Maximum age is ${eligibility.maxAge}`
      };
    }

    return {
      eligible: true
    };
  }

  if (
    eligibility.minAge !== null &&
    eligibility.minAge !== undefined &&
    age < eligibility.minAge
  ) {

    return {
      eligible: false,
      reason:
        `Minimum age is ${eligibility.minAge}`
    };
  }

  if (
    eligibility.maxAge !== null &&
    eligibility.maxAge !== undefined &&
    age > eligibility.maxAge
  ) {

    return {
      eligible: false,
      reason:
        `Maximum age is ${eligibility.maxAge}`
    };
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK INCOME
// =====================================================

const checkIncome = (
  scheme,
  annualIncome
) => {

  const maxIncome =
    scheme.eligibility
      ?.maxAnnualFamilyIncome;

  if (
    maxIncome !== null &&
    maxIncome !== undefined &&
    annualIncome > maxIncome
  ) {

    return {
      eligible: false,

      reason:
        `Annual family income must not exceed ₹${maxIncome}`
    };
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK CASTE
// =====================================================

const checkCaste = (
  scheme,
  caste
) => {

  const categories =
    scheme.eligibility
      ?.casteCategories || [];

  if (categories.length === 0) {

    return {
      eligible: true
    };
  }

  const userCaste =
    String(caste)
      .trim()
      .toUpperCase();

  const allowed =
    categories.some(
      category =>
        String(category)
          .trim()
          .toUpperCase() ===
        userCaste
    );

  if (!allowed) {

    return {
      eligible: false,

      reason:
        `Scheme is available for: ${categories.join(", ")}`
    };
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK GENDER
// =====================================================

const checkGender = (
  scheme,
  gender
) => {

  const schemeGender =
    scheme.eligibility?.gender;

  if (
    !schemeGender ||
    schemeGender.toUpperCase() === "ALL"
  ) {

    return {
      eligible: true
    };
  }

  if (
    String(gender)
      .trim()
      .toUpperCase() !==
    String(schemeGender)
      .trim()
      .toUpperCase()
  ) {

    return {
      eligible: false,

      reason:
        `Scheme is available for ${schemeGender} beneficiaries`
    };
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK PROJECT COST
// =====================================================

const checkProjectCost = (
  scheme,
  projectCost
) => {

  const financial =
    scheme.financial || {};

  const min =
    financial.minProjectCost;

  const max =
    financial.maxProjectCost;

  const minInclusive =
    financial.minProjectCostInclusive !== false;

  const maxInclusive =
    financial.maxProjectCostInclusive !== false;

  if (
    min !== null &&
    min !== undefined
  ) {

    if (minInclusive) {

      if (projectCost < min) {

        return {
          eligible: false,

          reason:
            `Project cost must be at least ₹${min}`
        };
      }

    } else {

      if (projectCost <= min) {

        return {
          eligible: false,

          reason:
            `Project cost must be greater than ₹${min}`
        };
      }
    }
  }

  if (
    max !== null &&
    max !== undefined
  ) {

    if (maxInclusive) {

      if (projectCost > max) {

        return {
          eligible: false,

          reason:
            `Project cost must not exceed ₹${max}`
        };
      }

    } else {

      if (projectCost >= max) {

        return {
          eligible: false,

          reason:
            `Project cost must be less than ₹${max}`
        };
      }
    }
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK LOAN AMOUNT
// =====================================================

const checkLoanAmount = (
  scheme,
  loanAmount,
  projectCost
) => {

  const financial =
    scheme.financial || {};

  if (
    financial.minLoanAmount !== null &&
    financial.minLoanAmount !== undefined &&
    loanAmount < financial.minLoanAmount
  ) {

    return {
      eligible: false,

      reason:
        `Loan amount must be at least ₹${financial.minLoanAmount}`
    };
  }

  if (
    financial.maxLoanAmount !== null &&
    financial.maxLoanAmount !== undefined &&
    loanAmount > financial.maxLoanAmount
  ) {

    return {
      eligible: false,

      reason:
        `Maximum loan amount is ₹${financial.maxLoanAmount}`
    };
  }

  // Maximum funding percentage
  if (
    financial.maximumFundingPercentage !== null &&
    financial.maximumFundingPercentage !== undefined &&
    projectCost > 0
  ) {

    const maximumLoan =
      projectCost *
      financial.maximumFundingPercentage /
      100;

    if (loanAmount > maximumLoan) {

      return {
        eligible: false,

        reason:
          `Requested loan exceeds ${financial.maximumFundingPercentage}% of project cost`
      };
    }
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK BUSINESS CATEGORY
// =====================================================

const checkBusinessCategory = (
  scheme,
  businessType
) => {

  const categories =
    scheme.business
      ?.applicableCategories || [];

  // ELS and schemes without business categories
  if (categories.length === 0) {

    return {
      eligible: true
    };
  }

  if (!businessType) {

    return {
      eligible: false,

      reason:
        "Business type is required for this scheme"
    };
  }

  const userBusiness =
    String(businessType)
      .trim()
      .toUpperCase();

  const allowed =
    categories.some(
      category =>
        String(category)
          .trim()
          .toUpperCase() ===
        userBusiness
    );

  if (!allowed) {

    return {
      eligible: false,

      reason:
        `Business type must be one of: ${categories.join(", ")}`
    };
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK STUDENT STATUS
// =====================================================

const checkStudentStatus = (
  scheme,
  studentStatus
) => {

  // Only apply this additional check to ELS
  if (
    scheme.schemeCode !== "NSFDC-ELS"
  ) {

    return {
      eligible: true
    };
  }

  if (
    studentStatus === undefined ||
    studentStatus === null
  ) {

    return {
      eligible: false,

      reason:
        "Student status is required for Educational Loan Scheme"
    };
  }

  if (
    studentStatus !== true
  ) {

    return {
      eligible: false,

      reason:
        "Applicant must be a student for Educational Loan Scheme"
    };
  }

  return {
    eligible: true
  };
};

// =====================================================
// CHECK STATE / DISTRICT AVAILABILITY
// =====================================================

const checkLocation = (
  scheme,
  state,
  district
) => {

  const availability =
    scheme.availability || {};

  const states =
    availability.states || [];

  const districts =
    availability.districts || [];

  // Empty means no restriction in current dataset
  if (states.length > 0) {

    const stateAllowed =
      states.some(
        item =>
          String(item)
            .toLowerCase() ===
          String(state)
            .toLowerCase()
      );

    if (!stateAllowed) {

      return {
        eligible: false,

        reason:
          "Scheme is not available in the selected state"
      };
    }
  }

  if (districts.length > 0) {

    const districtAllowed =
      districts.some(
        item =>
          String(item)
            .toLowerCase() ===
          String(district)
            .toLowerCase()
      );

    if (!districtAllowed) {

      return {
        eligible: false,

        reason:
          "Scheme is not available in the selected district"
      };
    }
  }

  return {
    eligible: true
  };
};

// =====================================================
// CALCULATE MAXIMUM LOAN
// =====================================================

const calculateMaximumLoan = (
  scheme,
  projectCost
) => {

  const financial =
    scheme.financial || {};

  let maximumLoan =
    financial.maxLoanAmount;

  if (
    financial.maximumFundingPercentage !== null &&
    financial.maximumFundingPercentage !== undefined &&
    projectCost
  ) {

    const fundingLimit =
      projectCost *
      financial.maximumFundingPercentage /
      100;

    if (
      maximumLoan === null ||
      maximumLoan === undefined
    ) {

      maximumLoan =
        fundingLimit;

    } else {

      maximumLoan =
        Math.min(
          maximumLoan,
          fundingLimit
        );
    }
  }

  return maximumLoan;
};

// =====================================================
// CHECK ONE SCHEME
// =====================================================

const evaluateScheme = (
  scheme,
  applicant
) => {

  const failedRules = [];

  // AGE
  const ageResult =
    checkAge(
      scheme,
      applicant.age
    );

  if (!ageResult.eligible) {
    failedRules.push(ageResult.reason);
  }

  // INCOME
  const incomeResult =
    checkIncome(
      scheme,
      applicant.annualFamilyIncome
    );

  if (!incomeResult.eligible) {
    failedRules.push(incomeResult.reason);
  }

  // CASTE
  const casteResult =
    checkCaste(
      scheme,
      applicant.caste
    );

  if (!casteResult.eligible) {
    failedRules.push(casteResult.reason);
  }

  // GENDER
  const genderResult =
    checkGender(
      scheme,
      applicant.gender
    );

  if (!genderResult.eligible) {
    failedRules.push(genderResult.reason);
  }

  // LOCATION
  const locationResult =
    checkLocation(
      scheme,
      applicant.state,
      applicant.district
    );

  if (!locationResult.eligible) {
    failedRules.push(locationResult.reason);
  }

  // PROJECT COST
  const projectCostResult =
    checkProjectCost(
      scheme,
      applicant.projectCost
    );

  if (!projectCostResult.eligible) {
    failedRules.push(projectCostResult.reason);
  }

  // LOAN AMOUNT
  const loanAmountResult =
    checkLoanAmount(
      scheme,
      applicant.loanAmount,
      applicant.projectCost
    );

  if (!loanAmountResult.eligible) {
    failedRules.push(loanAmountResult.reason);
  }

  // BUSINESS
  const businessResult =
    checkBusinessCategory(
      scheme,
      applicant.businessType
    );

  if (!businessResult.eligible) {
    failedRules.push(businessResult.reason);
  }

  // STUDENT
  const studentResult =
    checkStudentStatus(
      scheme,
      applicant.studentStatus
    );

  if (!studentResult.eligible) {
    failedRules.push(studentResult.reason);
  }

  const eligible =
    failedRules.length === 0;

  return {

    schemeId: scheme._id,

    schemeCode:
      scheme.schemeCode,

    schemeName:
      scheme.schemeName,

    shortName:
      scheme.shortName,

    eligible,

    reasons:
      eligible
        ? [
            "Applicant satisfies the configured eligibility rules"
          ]
        : [],

    failedRules,

    maximumLoanAmount:
      eligible
        ? calculateMaximumLoan(
            scheme,
            applicant.projectCost
          )
        : null,

    interestRate:
      scheme.financial?.interestRate || null,

    repayment:
      scheme.repayment || null,

    eligibleChannels:
      scheme.eligibleChannels || [],

    channelPartnerCategories:
      scheme.channelPartnerCategories || [],

    requiredDocuments:
      scheme.requiredDocuments || [],

    application:
      scheme.application || {}
  };
};

// =====================================================
// CHECK ELIGIBILITY
// POST /api/eligibility/check
// =====================================================

const checkEligibility = async (
  req,
  res,
  next
) => {

  try {

    const {
      age,
      annualFamilyIncome,
      caste,
      gender,
      state,
      district,
      occupation,
      employmentStatus,
      projectCost,
      loanAmount,
      businessType,
      studentStatus
    } = req.body;

    // -------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------

    if (
      age === undefined ||
      annualFamilyIncome === undefined ||
      !caste ||
      !gender ||
      !state ||
      !district ||
      projectCost === undefined ||
      loanAmount === undefined
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Age, income, caste, gender, state, district, project cost and loan amount are required"

      });
    }

    // -------------------------------------------------
    // BASIC VALIDATION
    // -------------------------------------------------

    if (
      Number(age) < 0 ||
      Number(age) > 120
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid age"
      });
    }

    if (
      Number(annualFamilyIncome) < 0
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid annual family income"
      });
    }

    if (
      Number(projectCost) < 0
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid project cost"
      });
    }

    if (
      Number(loanAmount) < 0
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid loan amount"
      });
    }

    const applicant = {

      age: Number(age),

      annualFamilyIncome:
        Number(annualFamilyIncome),

      caste,

      gender,

      state,

      district,

      occupation:
        occupation || "",

      employmentStatus:
        employmentStatus || "",

      projectCost:
        Number(projectCost),

      loanAmount:
        Number(loanAmount),

      businessType:
        businessType || "",

      studentStatus:
        studentStatus === true ||
        studentStatus === "true"
    };

    // -------------------------------------------------
    // GET ACTIVE SCHEMES
    // -------------------------------------------------

    const schemes =
      await LoanScheme.find({
        status: "ACTIVE"
      }).sort({
        schemeName: 1
      });

    // -------------------------------------------------
    // EVALUATE ALL SCHEMES
    // -------------------------------------------------

    const results =
      schemes.map(
        scheme =>
          evaluateScheme(
            scheme,
            applicant
          )
      );

    const eligibleSchemes =
      results.filter(
        result => result.eligible
      );

    const notEligibleSchemes =
      results.filter(
        result => !result.eligible
      );

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    res.status(200).json({

      success: true,

      applicant,

      summary: {

        totalSchemesChecked:
          results.length,

        eligibleSchemes:
          eligibleSchemes.length,

        notEligibleSchemes:
          notEligibleSchemes.length

      },

      eligibleSchemes,

      notEligibleSchemes

    });

  } catch (error) {

    next(error);
  }
};

// =====================================================
// GET ALL ACTIVE SCHEMES
// =====================================================

const getEligibilitySchemes = async (
  req,
  res,
  next
) => {

  try {

    const schemes =
      await LoanScheme.find({
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

    next(error);
  }
};

module.exports = {
  checkEligibility,
  getEligibilitySchemes
};