const express = require("express");

const router = express.Router();

const controller = require("../controller/index");
const personController = require("../controller/personController");

router.get("/", controller.home);
router.post("/createPerson", personController.createPerson);

module.exports = router;
