const Interview = require("../models/interview");
const InterviewModel = require("../models/interview");
const Person = require("../models/person");

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
    Interview.findOneAndRemove(req.body.id, (err) => {
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
    Person.findOneAndUpdate(req.body, (err, res) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        message: "Update is successful",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllInterivews = async (req, res) => {
  try {
    Interview.find({}, (err, interviews) => {
      var interviewMap = {};
      interviews.forEach((interview) => {
        interviewMap[interview._id] = interview;
      });
      res.status(200).json({
        interviewMap,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
