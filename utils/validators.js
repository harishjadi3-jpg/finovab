// =====================================================
// VALIDATORS
// =====================================================


// =====================================================
// EMAIL
// =====================================================

const isValidEmail = (email) => {

  if (
    typeof email !== "string" ||
    !email.trim()
  ) {
    return false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(
    email.trim()
  );
};


// =====================================================
// PASSWORD
// =====================================================

const isValidPassword = (password) => {

  return (
    typeof password === "string" &&
    password.length >= 6
  );

};


// =====================================================
// REQUIRED STRING
// =====================================================

const isRequiredString = (value) => {

  return (
    typeof value === "string" &&
    value.trim().length > 0
  );

};


// =====================================================
// VALID NUMBER
// =====================================================

const isValidNumber = (value) => {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return false;
  }

  return Number.isFinite(
    Number(value)
  );

};


// =====================================================
// NON-NEGATIVE NUMBER
// =====================================================

const isNonNegativeNumber = (value) => {

  return (
    isValidNumber(value) &&
    Number(value) >= 0
  );

};


// =====================================================
// AGE
// =====================================================

const isValidAge = (age) => {

  return (
    isValidNumber(age) &&
    Number(age) >= 0 &&
    Number(age) <= 120
  );

};


// =====================================================
// BOOLEAN
// =====================================================

const isBoolean = (value) => {

  return (
    value === true ||
    value === false
  );

};


// =====================================================
// REGISTRATION VALIDATION
// =====================================================

const validateRegistration = ({
  name,
  email,
  password
}) => {

  const errors = [];


  if (
    !isRequiredString(name)
  ) {

    errors.push(
      "Name is required"
    );

  }


  if (
    !isValidEmail(email)
  ) {

    errors.push(
      "Valid email is required"
    );

  }


  if (
    !isValidPassword(password)
  ) {

    errors.push(
      "Password must contain at least 6 characters"
    );

  }


  return {

    valid:
      errors.length === 0,

    errors

  };

};


// =====================================================
// LOGIN VALIDATION
// =====================================================

const validateLogin = ({
  email,
  password
}) => {

  const errors = [];


  if (
    !isValidEmail(email)
  ) {

    errors.push(
      "Valid email is required"
    );

  }


  if (
    !isRequiredString(password)
  ) {

    errors.push(
      "Password is required"
    );

  }


  return {

    valid:
      errors.length === 0,

    errors

  };

};


// =====================================================
// ELIGIBILITY INPUT VALIDATION
// =====================================================

const validateEligibilityInput = (data) => {

  const errors = [];


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
  } = data;


  // -----------------------------------------------
  // AGE
  // -----------------------------------------------

  if (
    !isValidAge(age)
  ) {

    errors.push(
      "Valid age is required"
    );

  }


  // -----------------------------------------------
  // INCOME
  // -----------------------------------------------

  if (
    !isNonNegativeNumber(
      annualFamilyIncome
    )
  ) {

    errors.push(
      "Valid annual family income is required"
    );

  }


  // -----------------------------------------------
  // CASTE
  // -----------------------------------------------

  if (
    !isRequiredString(caste)
  ) {

    errors.push(
      "Caste is required"
    );

  }


  // -----------------------------------------------
  // GENDER
  // -----------------------------------------------

  if (
    !isRequiredString(gender)
  ) {

    errors.push(
      "Gender is required"
    );

  }


  // -----------------------------------------------
  // STATE
  // -----------------------------------------------

  if (
    !isRequiredString(state)
  ) {

    errors.push(
      "State is required"
    );

  }


  // -----------------------------------------------
  // DISTRICT
  // -----------------------------------------------

  if (
    !isRequiredString(district)
  ) {

    errors.push(
      "District is required"
    );

  }


  // -----------------------------------------------
  // OCCUPATION
  // -----------------------------------------------

  if (
    !isRequiredString(occupation)
  ) {

    errors.push(
      "Occupation is required"
    );

  }


  // -----------------------------------------------
  // EMPLOYMENT STATUS
  // -----------------------------------------------

  if (
    !isRequiredString(
      employmentStatus
    )
  ) {

    errors.push(
      "Employment status is required"
    );

  }


  // -----------------------------------------------
  // PROJECT COST
  // -----------------------------------------------

  if (
    !isNonNegativeNumber(projectCost)
  ) {

    errors.push(
      "Valid project cost is required"
    );

  }


  // -----------------------------------------------
  // LOAN AMOUNT
  // -----------------------------------------------

  if (
    !isNonNegativeNumber(loanAmount)
  ) {

    errors.push(
      "Valid loan amount is required"
    );

  }


  // -----------------------------------------------
  // BUSINESS TYPE
  // -----------------------------------------------

  if (
    !isRequiredString(businessType)
  ) {

    errors.push(
      "Business type is required"
    );

  }


  // -----------------------------------------------
  // STUDENT STATUS
  // -----------------------------------------------

  if (
    !isBoolean(studentStatus)
  ) {

    errors.push(
      "studentStatus must be true or false"
    );

  }


  // -----------------------------------------------
  // LOAN > PROJECT COST
  // -----------------------------------------------

  if (
    isNonNegativeNumber(projectCost) &&
    isNonNegativeNumber(loanAmount)
  ) {

    if (
      Number(loanAmount) >
      Number(projectCost)
    ) {

      errors.push(
        "Loan amount cannot be greater than project cost"
      );

    }

  }


  return {

    valid:
      errors.length === 0,

    errors

  };

};


// =====================================================
// SCHEME VALIDATION
// =====================================================

const validateScheme = (data) => {

  const errors = [];


  if (
    !isRequiredString(
      data.schemeCode
    )
  ) {

    errors.push(
      "Scheme code is required"
    );

  }


  if (
    !isRequiredString(
      data.schemeName
    )
  ) {

    errors.push(
      "Scheme name is required"
    );

  }


  if (
    !isRequiredString(
      data.provider
    )
  ) {

    errors.push(
      "Provider is required"
    );

  }


  return {

    valid:
      errors.length === 0,

    errors

  };

};


// =====================================================
// OFFICE VALIDATION
// =====================================================

const validateOffice = (data) => {

  const errors = [];


  if (
    !isRequiredString(
      data.name
    )
  ) {

    errors.push(
      "Office name is required"
    );

  }


  if (
    !isRequiredString(
      data.category
    )
  ) {

    errors.push(
      "Office category is required"
    );

  }


  if (
    !isRequiredString(
      data.state
    )
  ) {

    errors.push(
      "State is required"
    );

  }


  return {

    valid:
      errors.length === 0,

    errors

  };

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  isValidEmail,

  isValidPassword,

  isRequiredString,

  isValidNumber,

  isNonNegativeNumber,

  isValidAge,

  isBoolean,

  validateRegistration,

  validateLogin,

  validateEligibilityInput,

  validateScheme,

  validateOffice

};