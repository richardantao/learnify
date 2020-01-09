const ObjectId = require("mongodb").ObjectId;

exports.Course = {
    _id: ObjectId(),
	// term: ObjectId(""),
	term: "",
	code: "CBE 3322",
	title: "Heat Transfer Operations",
	credit: 0.5,
	instructor: "Dominic Pjontek",
	theme: "#04D5A6"
};
