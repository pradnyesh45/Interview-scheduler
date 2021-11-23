const express = require("express");

const router = express.Router();

const controller = require("../controller/index");
const personController = require("../controller/personController");
const interviewController = require("../controller/interviewController");

// Home
router.get("/", controller.home);

// Person Controller
router.post("/createPerson", personController.createPerson);
router.delete("/deletePerson", personController.deletePerson);

// Interviwe Controller
router.post("/createInterveiw", interviewController.createInterview);
router.delete("/deleteInterview", interviewController.deleteInterview);
router.put("/updateInterview", interviewController.updateInterview);
router.get("/allInterviews", interviewController.getAllInterivews);

module.exports = router;
