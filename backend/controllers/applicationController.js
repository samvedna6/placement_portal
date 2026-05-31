const Application = require("../models/Application");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const alreadyApplied = await Application.findOne({
      studentId: req.user._id,
      jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    const application = await Application.create({
      studentId: req.user._id,
      jobId,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.user._id,
    }).populate("jobId");

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const scheduleInterview = async (req, res) => {
  try {
    const { interviewDate, interviewLink } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        interviewDate,
        interviewLink,
        status: "Interview Scheduled",
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Get student details from DB
    const student = await User.findById(application.studentId);

    if (student) {
      await sendEmail(
        student.email,
        "Interview Scheduled",
        `Hello ${student.name},

Your interview has been scheduled.

Date: ${interviewDate}

Interview Link:
${interviewLink}

Best of luck!

Placement Portal Team`
      );
    }

    res.json(application);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  updateApplicationStatus,
  scheduleInterview,
};