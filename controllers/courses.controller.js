const moment = require("moment");

const User = require("../models/User.model");

const controller = [];

// controller.newCourse = (req, res) => {
// 	const { _id } = req.user[0];
	
// 	User.find({ _id }, {
// 		"term._id": 1,
// 		"term.title": 1
// 	})
// 	.sort({ "term.date.start": -1 })
// 	.then(props => {
// 		if(!props) {
// 			return res.status(404).json({
// 				message: "The server was unable to find the resources required to fulfill your request"
// 			});
// 		} else {
// 			return res.status(200).json(props);
// 		};
// 	})
// 	.catch(err => {
// 		return res.status(500).json({
// 			message: err.message || "An error occurred on the server while processing your request"
// 		});
// 	});
// };
	
controller.create = (req, res) => {
	const { _id } = req.user[0];
	const { term, code, title, instructor, credit, theme } = req.body;
	
	User.updateOne({ _id }, {
		$push: {
			course: {
				term,
				code,
				title,
				instructor,
				credit,
				theme
			}
		}
	})
	.then(newCourse => {
		return res.status(201).json(newCourse);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while creating your new Course"
		});
	});
};

controller.read = (req, res) => {

};

controller.edit = (req, res) => {
	const { courseId } = req.params;
	User.find({ "course._id": courseId }, {
		"course.term": 1,
		"course.code": 1,
		"course.title": 1,
		"course.instructor": 1,
		"course.credit": 1,
		"course.theme": 1
	})
	.populate({ path: "course.term", select: "title" })
	.limit(1)
	.then(course => {
		if(!course) {
			return res.status(404).json({
				message: "The server was unable to find the selected course" 
			});
		} else {
			return res.status(200).json(course);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the selected Course" 
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured on the server while retrieving the selected Course" 
			});
		};
	});
};

controller.update = (req, res) => {
	const { courseId } = req.params;
	const { term, code, title, credit, instructor, theme } = req.body;
	
	User.updateOne({ "course._id": courseId }, {
		$set: {
			term,
			code,
			title,
			credit,
			instructor,
			theme, 
			meta: {
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}
		}
	})
	.then(revisedCourse => {
		if(!revisedCourse) {
			return res.status(404).json({
				message: "The server was unable to find the recently updated Course"
			});
		} else {
			return res.status(200).json(revisedCourse);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the selected Course"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating this Course"
			});
		};
	});
};

controller.delete = (req, res) => {
	const { courseId } = req.params;
	
	User.updateOne({ "course._id": courseId }, {
		$pull: {
			course: {
				_id: courseId
			}
		}
	})
	.then(deletedCourse => {
		if(!deletedCourse) {
			return res.status(404).json({
				message: "The server was unable to find the selected Course"
			});
		} else {
			return res.status(200).json(deletedCourse);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The server was unable to find the selected Course"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this Course"
			});
		};
	});
};

module.exports = controller;