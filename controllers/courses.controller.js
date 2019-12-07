const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Course = require("../models/Courses.model");

// initialize controller
const controller = [];
	
controller.create = (req, res) => {
	// const { _id } = req.user;
	const { term, code, title, instructor, credit, theme } = req.body;
	
	Course.create({
		_id: ObjectId(),
		user: ObjectId("5deb33a40039c4286179c4f1"),
		term,
		code,
		title,
		instructor,
		credit,
		theme
	})
	.then(newCourse => {
		return res.status(201).json({
			message: "New course created",
			newCourse 
		});
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.read = (req, res) => {
	// const { _id } = req.user;

	Course.find({ user: ObjectId("5deb33a40039c4286179c4f1") }, {
		term: 1,
		code: 1,
		title: 1,
		instructor: 1,
		credit: 1,
	})
	.populate("term", [ "title" ])
	.sort({})
	.then(courses => {
		if(courses.length === 0) {
			return res.status(404).json({
				message: "No courses were found"
			});
		} else {
			return res.status(200).json(courses);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.filter = (req, res) => {
	const { termId } = req.params;

	Course.find({ term: termId}, {
		term: 1,
		code: 1,
		title: 1,
		instructor: 1,
		credit: 1,
	})
	.sort({ code: 1 })
	.then(courses => {
		if(courses.length === 0) {
			return res.status(404).json({
				message: "No courses were found"
			});
		} else {
			return res.status(200).json(courses);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

controller.edit = (req, res) => {
	const { courseId } = req.params;
	
	Course.find({ _id: courseId }, {
		term: 1,
		code: 1,
		title: 1,
		instructor: 1,
		credit: 1,
		meta: 1
	})
	.populate("term", [ "title" ])
	.limit(1)
	.then(course => {
		if(course.length === 0) {
			return res.status(404).json({
				message: "No course found" 
			});
		} else {
			return res.status(200).json(course);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "No course found" 
			});
		} else {
			return res.status(500).json({
				message: err.message 
			});
		};
	});
};

controller.update = (req, res) => {
	const { courseId } = req.params;
	const { term, code, title, credit, instructor, theme, createdAt } = req.body;
	
	const update = {
		term,
		code,
		title,
		credit,
		instructor,
		theme, 
		meta: {
			createdAt,
			updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
		}
	}

	Course.updateOne({ _id: courseId }, {
		$set: update
	})
	.then(revisedCourse => {
		if(!revisedCourse) {
			return res.status(404).json({
				message: "No course found"
			});
		} else {
			return res.status(200).json({
				message: "Your course has been updated",
				update
			});
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "No course found"
			});
		} else {
			return res.status(500).json({
				message: err.message
			});
		};
	});
};

controller.delete = (req, res) => {
	const { courseId } = req.params;
	
	Course.deleteOne({ _id: courseId})
	.then(deletedCourse => {
		if(!deletedCourse) {
			return res.status(404).json({
				message: "No course found"
			});
		} else {
			return res.status(200).json({
				message: "Your course has been deleted"
			});
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "No course found"
			});
		} else {
			return res.status(500).json({
				message: err.message
			});
		};
	});
};

module.exports = controller;