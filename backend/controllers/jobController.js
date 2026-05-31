const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      package: req.body.package,
      location: req.body.location,
      skillsRequired: req.body.skillsRequired,
      deadline: req.body.deadline,
      createdBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const { location, company, skill } = req.query;

    let filter = {};

    if (location) {
      filter.location = location;
    }

    if (company) {
      filter.company = company;
    }
    if (skill) {
  filter.skillsRequired = { $in: [skill] };
}

    const jobs = await Job.find(filter);

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
};