const express = require("express");
const {
  recruiterDashboard,
  studentDashboard,
  adminDashboard,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recruiter", protect, recruiterDashboard);
router.get("/student", protect, studentDashboard);
router.get("/admin", protect, adminDashboard);

module.exports = router;