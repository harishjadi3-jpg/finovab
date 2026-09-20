const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const connectDB =
  require("../config/db");

const Admin =
  require("../models/Admin");


// =====================================================
// ADMIN DETAILS
// =====================================================

const ADMIN_NAME =
  "NSFDC Administrator";

const ADMIN_EMAIL =
  "admin@nsfdc.com";

const ADMIN_PASSWORD =
  "Admin@123";


// =====================================================
// CREATE ADMIN
// =====================================================

const createAdmin = async () => {

  try {

    console.log(
      "Connecting to MongoDB..."
    );

    await connectDB();


    // -----------------------------------------------
    // CHECK EXISTING ADMIN
    // -----------------------------------------------

    const existingAdmin =
      await Admin.findOne({
        email: ADMIN_EMAIL
      });


    if (existingAdmin) {

      console.log(
        "Admin already exists."
      );

      console.log(
        `Email: ${ADMIN_EMAIL}`
      );

      process.exit(0);

    }


    // -----------------------------------------------
    // HASH PASSWORD
    // -----------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        ADMIN_PASSWORD,
        10
      );


    // -----------------------------------------------
    // CREATE ADMIN
    // -----------------------------------------------

    const admin =
      await Admin.create({

        name: ADMIN_NAME,

        email: ADMIN_EMAIL,

        password: hashedPassword,

        role: "admin",

        active: true

      });


    console.log("");
    console.log(
      "=========================================="
    );

    console.log(
      "ADMIN CREATED SUCCESSFULLY"
    );

    console.log(
      "=========================================="
    );

    console.log(
      `Name     : ${admin.name}`
    );

    console.log(
      `Email    : ${admin.email}`
    );

    console.log(
      `Role     : ${admin.role}`
    );

    console.log(
      "Password : Admin@123"
    );

    console.log(
      "=========================================="
    );


    process.exit(0);

  } catch (error) {

    console.error(
      "Admin creation failed:"
    );

    console.error(
      error.message
    );

    process.exit(1);

  }

};


createAdmin();