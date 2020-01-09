const ObjectId = require("mongodb").ObjectId;

exports.Assessment = {
    _id: ObjectId(),
	// course: ObjectId(""),
	course: "",
	title: "Midterm Exam",
  	type: "Exam",
	date: {
		start: "2019-10-24",
		end: "2019-10-24"
	}, 
	location: "ACEB 1450",
	grade: {
		weight: "40",
  		score: ""
	},
};
