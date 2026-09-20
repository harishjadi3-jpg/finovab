const mongoose = require("mongoose");

const loanSchemeSchema = new mongoose.Schema(
  {
    // ==========================================
    // BASIC SCHEME INFORMATION
    // ==========================================

    schemeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    schemeName: {
      type: String,
      required: true,
      trim: true
    },

    shortName: {
      type: String,
      trim: true
    },

    provider: {
      type: String,
      required: true,
      trim: true
    },

    providerType: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    },

    description: {
      type: String
    },

    purpose: {
      type: String
    },


    // ==========================================
    // ELIGIBILITY RULES
    // ==========================================

    eligibility: {
      beneficiaryType: {
        type: String
      },

      casteCategories: {
        type: [String],
        default: []
      },

      maxAnnualFamilyIncome: {
        type: Number,
        default: null
      },

      minAge: {
        type: Number,
        default: null
      },

      maxAge: {
        type: Number,
        default: null
      },

      ageRule: {
        type: String
      },

      ageRuleNote: {
        type: String
      },

      gender: {
        type: String,
        default: "ALL"
      },

      otherConditions: {
        type: [String],
        default: []
      }
    },


    // ==========================================
    // FINANCIAL RULES
    // ==========================================

    financial: {
      minProjectCost: {
        type: Number,
        default: 0
      },

      minProjectCostInclusive: {
        type: Boolean,
        default: true
      },

      maxProjectCost: {
        type: Number,
        default: null
      },

      maxProjectCostInclusive: {
        type: Boolean,
        default: true
      },

      minLoanAmount: {
        type: Number,
        default: 0
      },

      maxLoanAmount: {
        type: Number,
        default: null
      },

      maximumFundingPercentage: {
        type: Number,
        default: null
      },

      marginMoney: {
        type: String
      },

      interestRate: {
        value: {
          type: Number,
          default: null
        },

        unit: {
          type: String
        },

        conditions: {
          type: [String],
          default: []
        }
      },

      loanLimitCondition: {
        type: String
      }
    },


    // ==========================================
    // REPAYMENT
    // ==========================================

    repayment: {
      minimumTenureMonths: {
        type: Number,
        default: 0
      },

      maximumTenureMonths: {
        type: Number,
        default: null
      },

      moratoriumMonths: {
        type: Number,
        default: 0
      },

      repaymentFrequency: {
        type: String
      },

      conditions: {
        type: [String],
        default: []
      }
    },


    // ==========================================
    // CHANNEL PARTNERS
    // ==========================================

    eligibleChannels: {
      type: [String],
      default: []
    },

    channelPartnerCategories: {
      type: [String],
      default: []
    },


    // ==========================================
    // BUSINESS RULES
    // ==========================================

    business: {
      applicableCategories: {
        type: [String],
        default: []
      },

      applicableActivities: {
        type: [String],
        default: []
      },

      applicableSizes: {
        type: [String],
        default: []
      },

      activityMatchingNote: {
        type: String
      }
    },


    // ==========================================
    // APPLICATION INFORMATION
    // ==========================================

    application: {
      onlineAvailable: {
        type: Boolean,
        default: false
      },

      onlineUrl: {
        type: String
      },

      offlineAvailable: {
        type: Boolean,
        default: false
      },

      channelisingAgencyRequired: {
        type: Boolean,
        default: false
      },

      process: {
        type: [String],
        default: []
      }
    },


    // ==========================================
    // REQUIRED DOCUMENTS
    // ==========================================

    requiredDocuments: [
      {
        name: {
          type: String,
          required: true
        },

        requirementLevel: {
          type: String
        },

        required: {
          type: Boolean,
          default: true
        }
      }
    ],


    documentNote: {
      type: String
    },


    // ==========================================
    // LOCATION AVAILABILITY
    // ==========================================

    availability: {
      states: {
        type: [String],
        default: []
      },

      districts: {
        type: [String],
        default: []
      }
    },


    // ==========================================
    // SOURCE
    // ==========================================

    source: {
      organization: {
        type: String
      },

      officialUrl: {
        type: String
      },

      lastVerifiedAt: {
        type: String
      }
    }
  },

  {
    timestamps: true
  }
);


// ==========================================
// INDEX
// ==========================================

loanSchemeSchema.index({
  schemeName: 1
});

loanSchemeSchema.index({
  status: 1
});


// ==========================================
// MODEL
// ==========================================

module.exports = mongoose.model(
  "LoanScheme",
  loanSchemeSchema
);