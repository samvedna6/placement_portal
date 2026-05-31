const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

// Recruiter Dashboard
const recruiterDashboard = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({
      createdBy: req.user._id,
    });

    const totalApplications = await Application.countDocuments();

    const shortlisted = await Application.countDocuments({
      status: "Shortlisted",
    });

    const selected = await Application.countDocuments({
      status: "Selected",
    });

    const rejected = await Application.countDocuments({
      status: "Rejected",
    });

    const recentApplicants = await Application.find()
      .populate("studentId", "name email")
      .populate("jobId", "title company")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalJobs,
      totalApplications,
      shortlisted,
      selected,
      rejected,
      recentApplicants,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Student Dashboard
const studentDashboard = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments({
      studentId: req.user._id,
    });

    const shortlisted = await Application.countDocuments({
      studentId: req.user._id,
      status: "Shortlisted",
    });

    const selected = await Application.countDocuments({
      studentId: req.user._id,
      status: "Selected",
    });

    const rejected = await Application.countDocuments({
      studentId: req.user._id,
      status: "Rejected",
    });

    res.json({
      totalApplications,
      shortlisted,
      selected,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    res.json({
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  recruiterDashboard,
  studentDashboard,
  adminDashboard,
};