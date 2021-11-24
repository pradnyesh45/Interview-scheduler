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
      const startTime = req.body.startTime;
      const endTime = req.body.endTime;
      const CandidateId = req.body.Candidate;
      const InterviewerId = req.body.Interviewer;
      const filledSlot = await InterviewModel.findOne({
        $and: [
          {
            $or: [{ Candidate: CandidateId }, { Interviewer: InterviewerId }],
          },
          {
            $and: [
              { startTime: { $lt: endTime } },
              { endTime: { $gt: startTime } },
            ],
          },
        ],
      });
      if (!filledSlot) {
        const interview = new InterviewModel(req.body);
        if (interview) {
          interview.save();
          res.status(200).json({
            message: "Interview successfully scheduled",
          });
        }
      } else {
        res.status(200).json({
          message: "Error in scheduling the interview",
        });
      }
      // d.endTime d.startTime
      // endTime starTime
      // endTime > d.startTime
      // startTime < d.endTime
      //                   a  b
      //            A   B
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteInterview = async (req, res) => {
  try {
    InterviewModel.findOneAndRemove(req.body.id, (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        message: "Delete successful",
      });
    });
  } catch (error) {
    console.log("error");
  }
};

module.exports.updateInterview = async (req, res) => {
  try {
    let interview = await InterviewModel.findOneAndReplace(
      { id: req.body.id },
      req.body
    );
    let newInterview = await InterviewModel.findOne({ id: req.body.id });
    if (interview != newInterview) {
      res.status(200).json({
        message: "Updated Successfully",
      });
    } else {
      res.status(200).json({
        messgae: "Update not successfull",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllInterviews = async (req, res) => {
  try {
    InterviewModel.find({}, (err, interviews) => {
      var interviewArray = [];
      interviews.forEach((interview) => {
        interviewArray.push(interview);
      });
      res.status(200).json({
        interviewArray,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
