const InterviewModel = require("../models/interview");

// Create Candidate or Interviewer
module.exports.createInterview = async (req, res) => {
  try {
    if (
      req.body.Candidate &&
      req.body.Interviewer &&
      req.body.startTime &&
      req.body.endTime
    ) {
      // TODO
      if (Ifavailable) {
        const Interview = new InterviewModel(req.body);
        Interview.save((error) => {
          console.log(error);
        });
        if (Interview) {
          return res.status(200).json({
            message: "Successfully scheduled the interview",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
