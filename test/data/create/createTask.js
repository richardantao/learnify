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