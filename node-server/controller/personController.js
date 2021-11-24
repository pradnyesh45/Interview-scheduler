const PersonModel = require("../models/person");

// Create Candidate or Interviewer
module.exports.createPerson = async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.email &&
      req.body.role &&
      req.body.name.length > 0 &&
      req.body.email.length > 0 &&
      (req.body.role == "Candidate" || req.body.role == "Interviewer")
    ) {
      const Person = new PersonModel(req.body);
      Person.save();
      if (Person) {
        return res.status(200).json({
          message: "Successfully created a Person",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deletePerson = async (req, res) => {
  try {
    PersonModel.findByIdAndDelete(req.body.id, (err, Person) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          message: `${Person} successfully deleted`,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllPersons = async (req, res) => {
  try {
    PersonModel.find({}, (err, persons) => {
      var personArray = [];
      persons.forEach((person) => {
        personArray.push(person);
      });
      res.status(200).json({
        personArray,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
