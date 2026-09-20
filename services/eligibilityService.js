// =====================================================
// ELIGIBILITY SERVICE
// =====================================================

const LoanScheme =
  require("../models/LoanScheme");


// =====================================================
// NORMALIZE TEXT
// =====================================================

const normalize = (value) => {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toUpperCase();

};


// =====================================================
// CHECK AGE
// =====================================================

const checkAge = (
  age,
  eligibility
) => {

  const applicantAge =
    Number(age);

  const ageRule =
    normalize(
      eligibility.ageRule
    );


  // -----------------------------------------------
  // NO MINIMUM AGE
  // Used by Educational Loan Scheme
  // -----------------------------------------------

  if (
    ageRule ===
    "NO_MINIMUM_AGE"
  ) {

    if (
      eligibility.maxAge !== null &&
      eligibility.maxAge !== undefined &&
      applicantAge >
        Number(eligibility.maxAge)
    ) {

      return {

        eligible: false,

        reason:
          `Age exceeds maximum allowed age of ${eligibility.maxAge}`

      };

    }

    return {
      eligible: true
    };

  }


  // -----------------------------------------------
  // MINIMUM AGE
  // -----------------------------------------------

  if (
    eligibility.minAge !== null &&
    eligibility.minAge !== undefined
  ) {

    if (
      applicantAge <
      Number(eligibility.minAge)
    ) {

      return {

        eligible: false,

        reason:
          `Minimum age is ${eligibility.minAge}`

      };

    }

  }


  // -----------------------------------------------
  // MAXIMUM AGE
  // -----------------------------------------------

  if (
    eligibility.maxAge !== null &&
    eligibility.maxAge !== undefined
  ) {

    if (
      applicantAge >
      Number(eligibility.maxAge)
    ) {

      return {

        eligible: false,

        reason:
          `Maximum age is ${eligibility.maxAge}`

      };

    }

  }


  return {
    eligible: true
  };

};


// =====================================================
// CHECK CASTE
// =====================================================

const checkCaste = (
  caste,
  eligibility
) => {

  const applicantCaste =
    normalize(caste);

  const allowedCastes =
    (
      eligibility.casteCategories ||
      []
    ).map(normalize);


  if (
    allowedCastes.length === 0
  ) {

    return {
      eligible: true
    };

  }


  if (
    !allowedCastes.includes(
      applicantCaste
    )
  ) {

    return {

      eligible: false,

      reason:
        `Caste ${caste} is not eligible`

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
  income,
  eligibility
) => {

  if (
    eligibility.maxAnnualFamilyIncome ===
      null ||
    eligibility.maxAnnualFamilyIncome ===
      undefined
  ) {

    return {
      eligible: true
    };

  }


  if (
    Number(income) >
    Number(
      eligibility.maxAnnualFamilyIncome
    )
  ) {

    return {

      eligible: false,

      reason:
        `Annual family income exceeds ₹${eligibility.maxAnnualFamilyIncome}`

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
  gender,
  eligibility
) => {

  const allowedGender =
    normalize(
      eligibility.gender
    );

  const applicantGender =
    normalize(gender);


  if (
    !allowedGender ||
    allowedGender === "ALL"
  ) {

    return {
      eligible: true
    };

  }


  if (
    allowedGender !==
    applicantGender
  ) {

    return {

      eligible: false,

      reason:
        `Gender ${gender} is not eligible`

    };

  }


  return {
    eligible: true
  };

};


// =====================================================
// CHECK STATE / DISTRICT
// =====================================================

const checkAvailability = (
  state,
  district,
  availability
) => {

  const states =
    (
      availability.states ||
      []
    ).map(normalize);

  const districts =
    (
      availability.districts ||
      []
    ).map(normalize);


  // Empty means all locations
  if (
    states.length === 0 &&
    districts.length === 0
  ) {

    return {
      eligible: true
    };

  }


  if (
    states.length > 0 &&
    !states.includes(
      normalize(state)
    )
  ) {

    return {

      eligible: false,

      reason:
        `Scheme is not available in ${state}`

    };

  }


  if (
    districts.length > 0 &&
    !districts.includes(
      normalize(district)
    )
  ) {

    return {

      eligible: false,

      reason:
        `Scheme is not available in ${district}`

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
  projectCost,
  financial
) => {

  const cost =
    Number(projectCost);


  // -----------------------------------------------
  // MINIMUM
  // -----------------------------------------------

  if (
    financial.minProjectCost !== null &&
    financial.minProjectCost !== undefined
  ) {

    if (
      financial.minProjectCostInclusive
    ) {

      if (
        cost <
        Number(
          financial.minProjectCost
        )
      ) {

        return {

          eligible: false,

          reason:
            `Project cost must be at least ₹${financial.minProjectCost}`

        };

      }

    } else {

      if (
        cost <=
        Number(
          financial.minProjectCost
        )
      ) {

        return {

          eligible: false,

          reason:
            `Project cost must be greater than ₹${financial.minProjectCost}`

        };

      }

    }

  }


  // -----------------------------------------------
  // MAXIMUM
  // -----------------------------------------------

  if (
    financial.maxProjectCost !== null &&
    financial.maxProjectCost !== undefined
  ) {

    if (
      financial.maxProjectCostInclusive
    ) {

      if (
        cost >
        Number(
          financial.maxProjectCost
        )
      ) {

        return {

          eligible: false,

          reason:
            `Project cost cannot exceed ₹${financial.maxProjectCost}`

        };

      }

    } else {

      if (
        cost >=
        Number(
          financial.maxProjectCost
        )
      ) {

        return {

          eligible: false,

          reason:
            `Project cost must be less than ₹${financial.maxProjectCost}`

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
  loanAmount,
  projectCost,
  financial,
  isEducationalLoan
) => {

  const requestedLoan =
    Number(loanAmount);


  // -----------------------------------------------
  // MAXIMUM LOAN
  // -----------------------------------------------

  if (
    financial.maxLoanAmount !== null &&
    financial.maxLoanAmount !== undefined
  ) {

    if (
      requestedLoan >
      Number(
        financial.maxLoanAmount
      )
    ) {

      return {

        eligible: false,

        reason:
          `Requested loan exceeds maximum loan of ₹${financial.maxLoanAmount}`

      };

    }

  }


  // -----------------------------------------------
  // FUNDING PERCENTAGE
  //
  // Do not apply this like a normal
  // business project for ELS.
  // -----------------------------------------------

  if (
    !isEducationalLoan &&
    financial.maximumFundingPercentage !==
      null &&
    financial.maximumFundingPercentage !==
      undefined
  ) {

    const maximumByFunding =
      Number(projectCost) *
      (
        Number(
          financial.maximumFundingPercentage
        ) / 100
      );


    if (
      requestedLoan >
      maximumByFunding
    ) {

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
// CHECK BUSINESS TYPE
// =====================================================

const checkBusinessType = (
  businessType,
  business,
  isEducationalLoan
) => {

  // ELS doesn't use business type.
  if (
    isEducationalLoan
  ) {

    return {
      eligible: true
    };

  }


  const categories =
    (
      business.applicableCategories ||
      []
    ).map(normalize);


  if (
    categories.length === 0
  ) {

    return {
      eligible: true
    };

  }


  const applicantBusiness =
    normalize(
      businessType
    );


  if (
    !categories.includes(
      applicantBusiness
    )
  ) {

    return {

      eligible: false,

      reason:
        `Business type ${businessType} is not covered by this scheme`

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
  studentStatus,
  scheme
) => {

  const beneficiaryType =
    normalize(
      scheme.eligibility
        .beneficiaryType
    );


  const isEducationalLoan =
    beneficiaryType ===
    "SC_STUDENT";


  if (
    isEducationalLoan &&
    studentStatus !== true
  ) {

    return {

      eligible: false,

      reason:
        "Applicant must be a student for the Educational Loan Scheme"

    };

  }


  return {
    eligible: true
  };

};


// =====================================================
// CALCULATE MAXIMUM ELIGIBLE LOAN
// =====================================================

const calculateMaximumEligibleLoan = (
  projectCost,
  financial,
  isEducationalLoan
) => {

  let maximumLoan =
    financial.maxLoanAmount !== null &&
    financial.maxLoanAmount !== undefined
      ? Number(
          financial.maxLoanAmount
        )
      : null;


  // -----------------------------------------------
  // NORMAL BUSINESS LOANS
  // -----------------------------------------------

  if (
    !isEducationalLoan &&
    financial.maximumFundingPercentage !==
      null &&
    financial.maximumFundingPercentage !==
      undefined
  ) {

    const fundingLimit =
      Number(projectCost) *
      (
        Number(
          financial.maximumFundingPercentage
        ) / 100
      );


    if (
      maximumLoan === null ||
      fundingLimit < maximumLoan
    ) {

      maximumLoan =
        fundingLimit;

    }

  }


  return maximumLoan !== null
    ? Math.floor(maximumLoan)
    : null;

};


// =====================================================
// EVALUATE ONE SCHEME
// =====================================================

const evaluateScheme = (
  scheme,
  applicant
) => {

  const failedRules = [];


  const isEducationalLoan =
    normalize(
      scheme.eligibility
        .beneficiaryType
    ) === "SC_STUDENT";


  // -----------------------------------------------
  // AGE
  // -----------------------------------------------

  const ageResult =
    checkAge(
      applicant.age,
      scheme.eligibility
    );

  if (
    !ageResult.eligible
  ) {

    failedRules.push(
      ageResult.reason
    );

  }


  // -----------------------------------------------
  // CASTE
  // -----------------------------------------------

  const casteResult =
    checkCaste(
      applicant.caste,
      scheme.eligibility
    );

  if (
    !casteResult.eligible
  ) {

    failedRules.push(
      casteResult.reason
    );

  }


  // -----------------------------------------------
  // INCOME
  // -----------------------------------------------

  const incomeResult =
    checkIncome(
      applicant.annualFamilyIncome,
      scheme.eligibility
    );

  if (
    !incomeResult.eligible
  ) {

    failedRules.push(
      incomeResult.reason
    );

  }


  // -----------------------------------------------
  // GENDER
  // -----------------------------------------------

  const genderResult =
    checkGender(
      applicant.gender,
      scheme.eligibility
    );

  if (
    !genderResult.eligible
  ) {

    failedRules.push(
      genderResult.reason
    );

  }


  // -----------------------------------------------
  // LOCATION
  // -----------------------------------------------

  const locationResult =
    checkAvailability(
      applicant.state,
      applicant.district,
      scheme.availability
    );

  if (
    !locationResult.eligible
  ) {

    failedRules.push(
      locationResult.reason
    );

  }


  // -----------------------------------------------
  // STUDENT
  // -----------------------------------------------

  const studentResult =
    checkStudentStatus(
      applicant.studentStatus,
      scheme
    );

  if (
    !studentResult.eligible
  ) {

    failedRules.push(
      studentResult.reason
    );

  }


  // -----------------------------------------------
  // PROJECT COST
  // -----------------------------------------------

  // ELS does not use project cost
  // like a business loan.

  if (
    !isEducationalLoan
  ) {

    const projectResult =
      checkProjectCost(
        applicant.projectCost,
        scheme.financial
      );

    if (
      !projectResult.eligible
    ) {

      failedRules.push(
        projectResult.reason
      );

    }

  }


  // -----------------------------------------------
  // LOAN AMOUNT
  // -----------------------------------------------

  const loanResult =
    checkLoanAmount(
      applicant.loanAmount,
      applicant.projectCost,
      scheme.financial,
      isEducationalLoan
    );

  if (
    !loanResult.eligible
  ) {

    failedRules.push(
      loanResult.reason
    );

  }


  // -----------------------------------------------
  // BUSINESS TYPE
  // -----------------------------------------------

  const businessResult =
    checkBusinessType(
      applicant.businessType,
      scheme.business,
      isEducationalLoan
    );

  if (
    !businessResult.eligible
  ) {

    failedRules.push(
      businessResult.reason
    );

  }


  // -----------------------------------------------
  // MAXIMUM ELIGIBLE LOAN
  // -----------------------------------------------

  const maximumEligibleLoan =
    calculateMaximumEligibleLoan(
      applicant.projectCost,
      scheme.financial,
      isEducationalLoan
    );


  // -----------------------------------------------
  // FINAL RESULT
  // -----------------------------------------------

  const eligible =
    failedRules.length === 0;


  return {

    eligible,

    scheme: {

      id: scheme._id,

      schemeCode:
        scheme.schemeCode,

      schemeName:
        scheme.schemeName,

      shortName:
        scheme.shortName,

      provider:
        scheme.provider,

      description:
        scheme.description,

      purpose:
        scheme.purpose

    },

    financial: {

      maximumEligibleLoan,

      maximumLoanAmount:
        scheme.financial
          .maxLoanAmount,

      maximumFundingPercentage:
        scheme.financial
          .maximumFundingPercentage,

      interestRate:
        scheme.financial
          .interestRate

    },

    repayment:
      scheme.repayment,

    eligibleChannels:
      scheme.eligibleChannels,

    requiredDocuments:
      scheme.requiredDocuments,

    reasons:
      eligible
        ? [
            "Applicant satisfies all checked eligibility rules."
          ]
        : [],

    failedRules

  };

};


// =====================================================
// MAIN ELIGIBILITY FUNCTION
// =====================================================

const checkEligibility = async (
  applicant
) => {

  // -----------------------------------------------
  // GET ACTIVE SCHEMES
  // -----------------------------------------------

  const schemes =
    await LoanScheme.find({
      status: "ACTIVE"
    }).sort({
      schemeName: 1
    });


  if (
    schemes.length === 0
  ) {

    return {

      success: false,

      message:
        "No active loan schemes found",

      eligibleSchemes: [],

      notEligibleSchemes: []

    };

  }


  // -----------------------------------------------
  // EVALUATE EVERY SCHEME
  // -----------------------------------------------

  const results =
    schemes.map(
      scheme =>
        evaluateScheme(
          scheme,
          applicant
        )
    );


  // -----------------------------------------------
  // SEPARATE RESULTS
  // -----------------------------------------------

  const eligibleSchemes =
    results.filter(
      result =>
        result.eligible
    );


  const notEligibleSchemes =
    results.filter(
      result =>
        !result.eligible
    );


  // -----------------------------------------------
  // RETURN
  // -----------------------------------------------

  return {

    success: true,

    totalSchemesChecked:
      results.length,

    eligibleCount:
      eligibleSchemes.length,

    notEligibleCount:
      notEligibleSchemes.length,

    eligibleSchemes,

    notEligibleSchemes

  };

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  checkEligibility,

  evaluateScheme

};