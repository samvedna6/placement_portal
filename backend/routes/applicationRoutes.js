const express = require("express");
const {
  applyJob,
  getMyApplications,
  updateApplicationStatus,
  scheduleInterview,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, applyJob);
router.get("/my", protect, getMyApplications);
router.put("/:id/status", protect, updateApplicationStatus);
router.put("/:id/interview", protect, scheduleInterview);

module.exports = router;