const InterviewModel = require("../models/interview");
const nodemailer = require("nodemailer");

// Create Candidate or Interviewer
module.exports.createInterview = async (req, res) => {
  try {
    if (
      req.body.Candidate &&
      req.body.Interviewer &&
      req.body.startTime &&
      req.body.endTime &&
      req.body.startTime < req.body.endTime
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
          // send mail with defined transport object
          // var transporter = nodemailer.createTransport({
          //   service: "gmail",
          //   auth: {
          //     user: "bcs_201834@iiitm.ac.in",
          //     pass: "4OSC4IXA",
          //   },
          // });

          // var mailOptions = {
          //   from: "bcs_201834@iiitm.ac.in",
          //   to: "myfriend@yahoo.com",
          //   subject: "Sending Email using Node.js",
          //   text: "That was easy!",
          // };

          // transporter.sendMail(mailOptions, function (error, info) {
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log("Email sent: " + info.response);
          //   }
          // });
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
    InterviewModel.findByIdAndDelete(req.params.id, (err) => {
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
    // console.log("req.body", req.body);
    if (
      req.body.Candidate._id &&
      req.body.Interviewer._id &&
      req.body.startTime &&
      req.body.endTime &&
      req.body.startTime < req.body.endTime
    ) {
      const startTime = req.body.startTime;
      const endTime = req.body.endTime;
      const CandidateId = req.body.Candidate._id;
      const InterviewerId = req.body.Interviewer._id;
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
        let interview = await InterviewModel.findOneAndUpdate(
          {
            id: req.body._id,
            Candidate: req.body.Candidate._id,
            Interviewer: req.body.Interviewer._id,
          },
          {
            Candidate: req.body.Candidate._id,
            Interviewer: req.body.Interviewer._id,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
          },
          { new: true }
        );
        // let newInterview = await InterviewModel.findOne({ id: req.body.id });
        if (interview) {
          res.status(200).json({
            message: "Updated Successfully",
          });
        } else {
          res.status(200).json({
            messgae: "Update not successfull",
          });
        }
      }
    }

    // let interview = await InterviewModel.findOneAndReplace(
    //   { id: req.body.id },
    //   req.body,
    //   { returnDocument: "after" }
    // );
    // // let newInterview = await InterviewModel.findOne({ id: req.body.id });
    // if (interview) {
    //   res.status(200).json({
    //     message: "Updated Successfully",
    //   });
    // } else {
    //   res.status(200).json({
    //     messgae: "Update not successfull",
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await InterviewModel.find({}).populate({
      path: "Candidate Interviewer",
    });
    // const interviews = await InterviewModel.find({});
    var interviewArray = [];
    interviews.forEach((interview) => {
      interviewArray.push(interview);
    });
    // console.log("response", response);
    if (interviews) {
      res.status(200).json({
        interviewArray,
      });
    }
    // InterviewModel.find({}, (err, interviews) => {
    //   var interviewArray = [];
    //   interviews.forEach((interview) => {
    //     interviewArray.push(interview);
    //   });

    // res.status(200).json({
    //   interviewArray,
    //
    // });
    // });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getInterviewById = async (req, res) => {
  // console.log("req.params.id", req.params.id);
  try {
    const response = await InterviewModel.findById(req.params.id).populate({
      path: "Candidate Interviewer",
      select: "name",
    });
    // console.log("response", response);
    if (response) {
      res.status(200).json({
        response,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
