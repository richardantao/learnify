const ObjectId = require("mongodb").ObjectId;

exports.Task = {
    _id: ObjectId(),
	// course: ObjectId(""),
	course: "",
	title: "Chapter 3 Notea",
	type: "Notes",
	deadline: "2019-10-02",
	completion: 0,
	description: "",
};

// POSTMAN

const chapter1 = {
	"course": "5e4b6304d06be650adf02319",
	"title": "Chapter 1 Notes",
	"type": "Notes",
	"deadline": "2020-01-27",
	"completion": 0,
	"description": "" 
};

const chapter2 = {
	"course": "5e4b6304d06be650adf02319",
	"title": "Chapter 2 Notes",
	"type": "Notes",
	"deadline": "2020-02-28",
	"completion": 0,
	"description": "" 
};