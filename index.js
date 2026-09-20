// =====================================================
// DNS FIX FOR MONGODB ATLAS
// =====================================================

const dns = require("dns");

dns.setServers(["1.1.1.1"]);

// =====================================================
// IMPORTS
// =====================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// =====================================================
// LOAD ENVIRONMENT VARIABLES
// =====================================================

dotenv.config();

// =====================================================
// DATABASE
// =====================================================

const connectDB = require("./config/db");

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/authRoutes");

const schemeRoutes = require("./routes/schemeRoutes");

const officeRoutes = require("./routes/officeRoutes");

const locationRoutes = require("./routes/locationRoutes");

const userRoutes = require("./routes/userRoutes");

const eligibilityRoutes =
  require("./routes/eligibilityRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

// =====================================================
// ERROR MIDDLEWARE
// =====================================================

const {
  notFound,
  errorHandler
} = require("./middleware/errorMiddleware");

// =====================================================
// CREATE EXPRESS APP
// =====================================================

const app = express();

// =====================================================
// CHECK ROUTE IMPORTS
// =====================================================

console.log("");
console.log("==========================================");
console.log("CHECKING ROUTE IMPORTS");
console.log("==========================================");

console.log(
  "authRoutes:",
  typeof authRoutes
);

console.log(
  "schemeRoutes:",
  typeof schemeRoutes
);

console.log(
  "officeRoutes:",
  typeof officeRoutes
);

console.log(
  "locationRoutes:",
  typeof locationRoutes
);

console.log(
  "userRoutes:",
  typeof userRoutes
);

console.log(
  "eligibilityRoutes:",
  typeof eligibilityRoutes
);

console.log(
  "adminRoutes:",
  typeof adminRoutes
);

console.log("==========================================");
console.log("");

// =====================================================
// ROUTE IMPORT VALIDATION
// =====================================================

const routes = {
  authRoutes,
  schemeRoutes,
  officeRoutes,
  locationRoutes,
  userRoutes,
  eligibilityRoutes,
  adminRoutes
};

for (const [name, route] of Object.entries(routes)) {

  if (typeof route !== "function") {

    console.error("");
    console.error("==========================================");
    console.error("ROUTE IMPORT ERROR");
    console.error("==========================================");

    console.error(
      `${name} is not a valid Express router.`
    );

    console.error(
      "Expected: function"
    );

    console.error(
      "Received:",
      typeof route
    );

    console.error("==========================================");
    console.error("");

    process.exit(1);
  }
}

// =====================================================
// CONNECT DATABASE
// =====================================================

connectDB();

// =====================================================
// CORS CONFIGURATION
// =====================================================

// Frontend URLs allowed to access this backend

const allowedOrigins = [

  // Local Vite frontend
  "http://localhost:5173",

  // Local frontend using 127.0.0.1
  "http://127.0.0.1:5173",

  // Deployed Vercel frontend
  "https://finova-six-beta.vercel.app"

];

// =====================================================
// CORS MIDDLEWARE
// =====================================================

app.use(
  cors({

    origin: function (origin, callback) {

      // Allow requests that do not contain an Origin
      // Example: Postman, server-to-server requests
      if (!origin) {

        return callback(null, true);

      }

      // Check whether the frontend is allowed
      if (allowedOrigins.includes(origin)) {

        console.log(
          `CORS allowed: ${origin}`
        );

        return callback(null, true);

      }

      // Reject unknown origins
      console.log(
        `CORS blocked: ${origin}`
      );

      return callback(
        new Error("Not allowed by CORS")
      );

    },

    credentials: true

  })
);

// =====================================================
// GLOBAL MIDDLEWARE
// =====================================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "NSFDC Backend API is running",

    version:
      "1.0.0"

  });

});

// =====================================================
// API ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/schemes",
  schemeRoutes
);

app.use(
  "/api/offices",
  officeRoutes
);

app.use(
  "/api/locations",
  locationRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/eligibility",
  eligibilityRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

// =====================================================
// 404 HANDLER
// =====================================================

app.use(
  notFound
);

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(
  errorHandler
);

// =====================================================
// START SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log("");

    console.log("==========================================");
    console.log("NSFDC BACKEND SERVER");
    console.log("==========================================");

    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      `http://localhost:${PORT}`
    );

    console.log("");

    console.log("Allowed CORS Origins:");
    console.log("------------------------------------------");

    allowedOrigins.forEach(
      (origin) => {
        console.log(origin);
      }
    );

    console.log("------------------------------------------");

    console.log("");

    console.log("Available API Routes:");
    console.log("------------------------------------------");

    console.log(
      "AUTH        : /api/auth"
    );

    console.log(
      "USERS       : /api/users"
    );

    console.log(
      "ADMIN       : /api/admin"
    );

    console.log(
      "SCHEMES     : /api/schemes"
    );

    console.log(
      "OFFICES     : /api/offices"
    );

    console.log(
      "LOCATIONS   : /api/locations"
    );

    console.log(
      "ELIGIBILITY : /api/eligibility"
    );

    console.log("------------------------------------------");

    console.log(
      "Server started successfully."
    );

    console.log("==========================================");
    console.log("");

  }
);