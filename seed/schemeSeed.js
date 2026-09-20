const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const LoanScheme = require("../models/LoanScheme");

// Load .env from Backend folder
dotenv.config({
  path: path.join(__dirname, "..", ".env")
});

const schemes = [
  // =========================================================
  // 1. NSFDC MICRO FINANCE SCHEME
  // =========================================================

  {
    schemeCode: "NSFDC-MFS",
    schemeName: "Micro Finance Scheme",
    shortName: "MFS",
    provider: "National Scheduled Castes Finance and Development Corporation",
    providerType: "Government",
    status: "ACTIVE",

    description:
      "Micro Finance Scheme for eligible Scheduled Caste beneficiaries for small income generating activities.",

    purpose:
      "To provide financial assistance for small income generating activities.",

    eligibility: {
      beneficiaryType: "SC",
      casteCategories: ["SC"],
      maxAnnualFamilyIncome: 500000,
      minAge: 18,
      maxAge: 60,
      ageRule: "STANDARD",
      ageRuleNote: "Applicant should be between 18 and 60 years.",
      gender: "ALL",

      otherConditions: [
        "Applicant must belong to Scheduled Caste category.",
        "Valid caste certificate is required.",
        "Annual family income should not exceed ₹5 lakh."
      ]
    },

    financial: {
      minProjectCost: 0,
      minProjectCostInclusive: true,

      maxProjectCost: 140000,
      maxProjectCostInclusive: true,

      minLoanAmount: 0,
      maxLoanAmount: 125000,

      maximumFundingPercentage: 90,

      marginMoney: null,

      interestRate: {
        value: 6.5,
        unit: "PERCENT_PER_ANNUM",
        conditions: []
      },

      loanLimitCondition:
        "Maximum loan amount is ₹1.25 lakh for projects costing up to ₹1.40 lakh."
    },

    repayment: {
      minimumTenureMonths: 0,
      maximumTenureMonths: 36,
      moratoriumMonths: 3,
      repaymentFrequency: "QUARTERLY",

      conditions: []
    },

    eligibleChannels: [
      "SCA",
      "CA"
    ],

    channelPartnerCategories: [
      "STATE_CHANNELIZING_AGENCY",
      "CHANNELIZING_AGENCY"
    ],

    business: {
      applicableCategories: [
        "AGRICULTURE_ALLIED",
        "RETAIL",
        "FOOD",
        "MANUFACTURING",
        "TEXTILE",
        "HANDICRAFT",
        "PERSONAL_SERVICES",
        "REPAIR_SERVICES",
        "TRANSPORT",
        "OTHER"
      ],

      applicableActivities: [],

      applicableSizes: [
        "VERY_SMALL",
        "SMALL"
      ],

      activityMatchingNote:
        "Small income generating activities covered under the scheme."
    },

    application: {
      onlineAvailable: true,
      onlineUrl: "https://pmsuraj.dosje.gov.in/",
      offlineAvailable: true,
      channelisingAgencyRequired: true,

      process: []
    },

    requiredDocuments: [
      {
        name: "Caste Certificate",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Income Proof",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "KYC Documents",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Business / Project Documents",
        requirementLevel: "REQUIRED",
        required: true
      }
    ],

    documentNote:
      "Documents required for establishing eligibility and project details.",

    availability: {
      states: [],
      districts: []
    },

    source: {
      organization:
        "National Scheduled Castes Finance and Development Corporation",
      officialUrl: "",
      lastVerifiedAt: ""
    }
  },


  // =========================================================
  // 2. NSFDC AAJEEVIKA MICRO-FINANCE YOJANA
  // =========================================================

  {
    schemeCode: "NSFDC-AMY",
    schemeName: "Aajeevika Micro-Finance Yojana",
    shortName: "AMY",
    provider: "National Scheduled Castes Finance and Development Corporation",
    providerType: "Government",
    status: "ACTIVE",

    description:
      "Micro-finance assistance for eligible Scheduled Caste beneficiaries through NBFC-MFIs.",

    purpose:
      "To provide micro-finance assistance for income generating activities.",

    eligibility: {
      beneficiaryType: "SC",
      casteCategories: ["SC"],
      maxAnnualFamilyIncome: 500000,
      minAge: 18,
      maxAge: 60,
      ageRule: "STANDARD",
      ageRuleNote: "Applicant should be between 18 and 60 years.",
      gender: "ALL",

      otherConditions: [
        "Applicant must belong to Scheduled Caste category.",
        "Valid caste certificate is required.",
        "Annual family income should not exceed ₹5 lakh."
      ]
    },

    financial: {
      minProjectCost: 0,
      minProjectCostInclusive: true,

      maxProjectCost: 140000,
      maxProjectCostInclusive: true,

      minLoanAmount: 0,
      maxLoanAmount: 125000,

      maximumFundingPercentage: 90,

      marginMoney: null,

      interestRate: {
        value: 15,
        unit: "PERCENT_PER_ANNUM",
        conditions: []
      },

      loanLimitCondition:
        "Maximum loan amount is ₹1.25 lakh for projects costing up to ₹1.40 lakh."
    },

    repayment: {
      minimumTenureMonths: 0,
      maximumTenureMonths: 36,
      moratoriumMonths: 3,
      repaymentFrequency: "QUARTERLY",

      conditions: []
    },

    eligibleChannels: [
      "NBFC-MFI"
    ],

    channelPartnerCategories: [
      "NBFC_MFI"
    ],

    business: {
      applicableCategories: [
        "AGRICULTURE_ALLIED",
        "RETAIL",
        "FOOD",
        "MANUFACTURING",
        "TEXTILE",
        "HANDICRAFT",
        "PERSONAL_SERVICES",
        "REPAIR_SERVICES",
        "TRANSPORT",
        "OTHER"
      ],

      applicableActivities: [],

      applicableSizes: [
        "VERY_SMALL",
        "SMALL"
      ],

      activityMatchingNote:
        "Small income generating activities covered under the scheme."
    },

    application: {
      onlineAvailable: true,
      onlineUrl: "https://pmsuraj.dosje.gov.in/",
      offlineAvailable: true,
      channelisingAgencyRequired: true,

      process: []
    },

    requiredDocuments: [
      {
        name: "Caste Certificate",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Income Proof",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "KYC Documents",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Business / Project Documents",
        requirementLevel: "REQUIRED",
        required: true
      }
    ],

    documentNote:
      "Documents required for establishing eligibility and project details.",

    availability: {
      states: [],
      districts: []
    },

    source: {
      organization:
        "National Scheduled Castes Finance and Development Corporation",
      officialUrl: "",
      lastVerifiedAt: ""
    }
  },


  // =========================================================
  // 3. NSFDC TERM LOAN
  // =========================================================

  {
    schemeCode: "NSFDC-TL",
    schemeName: "Term Loan",
    shortName: "TL",
    provider: "National Scheduled Castes Finance and Development Corporation",
    providerType: "Government",
    status: "ACTIVE",

    description:
      "Term loan assistance for eligible Scheduled Caste beneficiaries for projects costing above ₹1.40 lakh and up to ₹50 lakh.",

    purpose:
      "To finance viable income generating projects and enterprises.",

    eligibility: {
      beneficiaryType: "SC",
      casteCategories: ["SC"],
      maxAnnualFamilyIncome: 500000,
      minAge: 18,
      maxAge: 60,
      ageRule: "STANDARD",
      ageRuleNote: "Applicant should be between 18 and 60 years.",
      gender: "ALL",

      otherConditions: [
        "Applicant must belong to Scheduled Caste category.",
        "Valid caste certificate is required.",
        "Annual family income should not exceed ₹5 lakh."
      ]
    },

    financial: {
      minProjectCost: 140000,
      minProjectCostInclusive: false,

      maxProjectCost: 5000000,
      maxProjectCostInclusive: true,

      minLoanAmount: 0,
      maxLoanAmount: 4500000,

      maximumFundingPercentage: 90,

      marginMoney: null,

      interestRate: {
        value: 8,
        unit: "PERCENT_PER_ANNUM",
        conditions: []
      },

      loanLimitCondition:
        "Maximum loan amount is ₹45 lakh per unit."
    },

    repayment: {
      minimumTenureMonths: 0,
      maximumTenureMonths: 84,
      moratoriumMonths: 6,
      repaymentFrequency: "QUARTERLY",

      conditions: [
        "Moratorium can extend up to 12 months for plantation and construction projects."
      ]
    },

    eligibleChannels: [
      "SCA",
      "CA"
    ],

    channelPartnerCategories: [
      "STATE_CHANNELIZING_AGENCY",
      "CHANNELIZING_AGENCY"
    ],

    business: {
      applicableCategories: [
        "AGRICULTURE_ALLIED",
        "RETAIL",
        "FOOD",
        "HOSPITALITY",
        "MANUFACTURING",
        "TEXTILE",
        "HANDICRAFT",
        "PERSONAL_SERVICES",
        "REPAIR_SERVICES",
        "TRANSPORT",
        "CONSTRUCTION",
        "DIGITAL_IT",
        "OTHER"
      ],

      applicableActivities: [],

      applicableSizes: [
        "SMALL",
        "MEDIUM_BIG"
      ],

      activityMatchingNote:
        "Suitable for income generating projects and enterprises within the permitted project cost range."
    },

    application: {
      onlineAvailable: true,
      onlineUrl: "https://pmsuraj.dosje.gov.in/",
      offlineAvailable: true,
      channelisingAgencyRequired: true,

      process: []
    },

    requiredDocuments: [
      {
        name: "Caste Certificate",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Income Proof",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "KYC Documents",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Business / Project Documents",
        requirementLevel: "REQUIRED",
        required: true
      }
    ],

    documentNote:
      "Documents required for establishing eligibility and project details.",

    availability: {
      states: [],
      districts: []
    },

    source: {
      organization:
        "National Scheduled Castes Finance and Development Corporation",
      officialUrl: "",
      lastVerifiedAt: ""
    }
  },


  // =========================================================
  // 4. NSFDC UDYAM NIDHI YOJANA
  // =========================================================

  {
    schemeCode: "NSFDC-UNY",
    schemeName: "Udyam Nidhi Yojana",
    shortName: "UNY",
    provider: "National Scheduled Castes Finance and Development Corporation",
    providerType: "Government",
    status: "ACTIVE",

    description:
      "Financial assistance for eligible Scheduled Caste beneficiaries through cooperative institutions and Small Finance Banks.",

    purpose:
      "To support eligible income generating activities.",

    eligibility: {
      beneficiaryType: "SC",
      casteCategories: ["SC"],
      maxAnnualFamilyIncome: 500000,
      minAge: 18,
      maxAge: 60,
      ageRule: "STANDARD",
      ageRuleNote: "Applicant should be between 18 and 60 years.",
      gender: "ALL",

      otherConditions: [
        "Applicant must belong to Scheduled Caste category.",
        "Valid caste certificate is required.",
        "Annual family income should not exceed ₹5 lakh."
      ]
    },

    financial: {
      minProjectCost: 0,
      minProjectCostInclusive: true,

      maxProjectCost: 500000,
      maxProjectCostInclusive: true,

      minLoanAmount: 0,
      maxLoanAmount: 450000,

      maximumFundingPercentage: 90,

      marginMoney: null,

      interestRate: {
        value: null,
        unit: "PERCENT_PER_ANNUM",

        conditions: [
          "13% through Cooperative Societies / Cooperative Banks.",
          "15% through Small Finance Banks."
        ]
      },

      loanLimitCondition:
        "Maximum loan amount is ₹4.50 lakh."
    },

    repayment: {
      minimumTenureMonths: 0,
      maximumTenureMonths: 60,
      moratoriumMonths: 3,
      repaymentFrequency: "MONTHLY",

      conditions: []
    },

    eligibleChannels: [
      "COOPERATIVE_SOCIETY",
      "COOPERATIVE_BANK",
      "SFB"
    ],

    channelPartnerCategories: [
      "COOPERATIVE_SOCIETY",
      "COOPERATIVE_BANK",
      "SMALL_FINANCE_BANK"
    ],

    business: {
      applicableCategories: [
        "AGRICULTURE_ALLIED",
        "RETAIL",
        "FOOD",
        "MANUFACTURING",
        "TEXTILE",
        "HANDICRAFT",
        "PERSONAL_SERVICES",
        "REPAIR_SERVICES",
        "TRANSPORT",
        "OTHER"
      ],

      applicableActivities: [],

      applicableSizes: [
        "VERY_SMALL",
        "SMALL"
      ],

      activityMatchingNote:
        "Eligible income generating activities within the permitted project cost."
    },

    application: {
      onlineAvailable: true,
      onlineUrl: "https://pmsuraj.dosje.gov.in/",
      offlineAvailable: true,
      channelisingAgencyRequired: true,

      process: []
    },

    requiredDocuments: [
      {
        name: "Caste Certificate",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Income Proof",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "KYC Documents",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Business / Project Documents",
        requirementLevel: "REQUIRED",
        required: true
      }
    ],

    documentNote:
      "Documents required for establishing eligibility and project details.",

    availability: {
      states: [],
      districts: []
    },

    source: {
      organization:
        "National Scheduled Castes Finance and Development Corporation",
      officialUrl: "",
      lastVerifiedAt: ""
    }
  },


  // =========================================================
  // 5. NSFDC EDUCATIONAL LOAN SCHEME
  // =========================================================

  {
    schemeCode: "NSFDC-ELS",
    schemeName: "Educational Loan Scheme",
    shortName: "ELS",
    provider: "National Scheduled Castes Finance and Development Corporation",
    providerType: "Government",
    status: "ACTIVE",

    description:
      "Educational loan assistance for eligible Scheduled Caste students pursuing qualifying courses.",

    purpose:
      "To provide financial assistance for higher education and qualifying courses.",

    eligibility: {
      beneficiaryType: "SC_STUDENT",
      casteCategories: ["SC"],
      maxAnnualFamilyIncome: 500000,

      minAge: 0,
      maxAge: 60,

      ageRule: "NO_MINIMUM_AGE",

      ageRuleNote:
        "No minimum age is used in initial screening; eligibility primarily depends on student status, SC status, income and qualifying course/admission.",

      gender: "ALL",

      otherConditions: [
        "Applicant must belong to Scheduled Caste category.",
        "Applicant should be a student.",
        "Annual family income should not exceed ₹5 lakh.",
        "Applicant must have admission to a qualifying course.",
        "Course / institution should satisfy applicable requirements."
      ]
    },

    financial: {
      minProjectCost: 0,
      minProjectCostInclusive: true,

      maxProjectCost: 0,
      maxProjectCostInclusive: false,

      minLoanAmount: 0,
      maxLoanAmount: 4000000,

      maximumFundingPercentage: 90,

      marginMoney: null,

      interestRate: {
        value: 6.5,
        unit: "PERCENT_PER_ANNUM",
        conditions: []
      },

      loanLimitCondition:
        "Maximum loan is ₹40 lakh or 90% of course fee, whichever is less."
    },

    repayment: {
      minimumTenureMonths: 120,
      maximumTenureMonths: 144,
      moratoriumMonths: 0,
      repaymentFrequency: "MONTHLY",

      conditions: [
        "Moratorium may cover the course duration plus one year."
      ]
    },

    eligibleChannels: [
      "SCA",
      "CA",
      "OTHER_AUTHORIZED_CHANNEL_PARTNER"
    ],

    channelPartnerCategories: [
      "STATE_CHANNELIZING_AGENCY",
      "CHANNELIZING_AGENCY",
      "OTHER_AUTHORIZED_CHANNEL_PARTNER"
    ],

    business: {
      applicableCategories: [],
      applicableActivities: [],
      applicableSizes: [],

      activityMatchingNote:
        "Not applicable because this is an educational loan scheme."
    },

    application: {
      onlineAvailable: true,
      onlineUrl: "https://pmsuraj.dosje.gov.in/",
      offlineAvailable: true,
      channelisingAgencyRequired: true,

      process: []
    },

    requiredDocuments: [
      {
        name: "Caste Certificate",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Income Proof",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "KYC Documents",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Admission Proof",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Course Fee Details",
        requirementLevel: "REQUIRED",
        required: true
      },
      {
        name: "Institution / Course Recognition Documents",
        requirementLevel: "REQUIRED",
        required: true
      }
    ],

    documentNote:
      "Educational documents are required along with caste, income and KYC documents.",

    availability: {
      states: [],
      districts: []
    },

    source: {
      organization:
        "National Scheduled Castes Finance and Development Corporation",
      officialUrl: "",
      lastVerifiedAt: ""
    }
  }
];


// =========================================================
// SEED DATABASE
// =========================================================

const seedSchemes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for scheme seeding");

    // Remove existing schemes before inserting fresh data
    await LoanScheme.deleteMany({});

    console.log("Existing schemes removed");

    const insertedSchemes = await LoanScheme.insertMany(schemes);

    console.log(
      `${insertedSchemes.length} NSFDC schemes inserted successfully`
    );

    insertedSchemes.forEach((scheme) => {
      console.log(
        `${scheme.schemeCode} -> ${scheme.schemeName}`
      );
    });

    await mongoose.connection.close();

    console.log("Database connection closed");
    process.exit(0);

  } catch (error) {
    console.error("Scheme seeding failed:");
    console.error(error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedSchemes();