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
router.get("/allPersons", personController.getAllPersons);

// Interview Controller
router.post("/createInterview", interviewController.createInterview);
router.delete("/deleteInterview/:id", interviewController.deleteInterview);
router.put("/updateInterview", interviewController.updateInterview);
router.get("/allInterviews", interviewController.getAllInterviews);
router.get("/getInterviewById/:id", interviewController.getInterviewById);

module.exports = router;
