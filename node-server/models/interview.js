const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    Candidate: {
      type: ObjectId,
      ref: "Person",
    },
    Interviewer: {
      type: ObjectId,
      ref: "Person",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
