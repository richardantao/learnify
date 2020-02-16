const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Course = require("../models/Courses");
const Term = require("../models/Terms");

	
exports.create = (req, res) => {
	const { term, code, title, instructor, credit, theme } = req.body;

	Course.create({
		_id: ObjectId(),
		term,
		code,
		title,
		instructor,
		credit,
		theme
	})
	.then(course => {
		return res.status(201).json(course);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});

};

exports.read = (req, res) => {
	const { termId } = req.params;

	Course.find({ term: termId }, {
		term: 1,
		code: 1,
		title: 1,
		instructor: 1,
		credit: 1,
		meta: 1
	})
	.populate("term", [ "title" ])
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

exports.edit = (req, res) => {
	const { courseId } = req.params;

	const getCourse = callback => {
		Course.find({ _id: courseId }, {
			term: 1,
			code: 1,
			title: 1,
			instructor: 1,
			credit: 1,
			meta: 1
		})
		.populate("term", [ "title", "year" ])
		.limit(1)
		.then(course => {
			if(course.length === 0) {
				return res.status(404).json({
					message: "No course found" 
				});
			} else {
				redis.setex(JSON.stringify(course[0]._id), 3600, JSON.stringify(course[0]));

				return callback(null, course[0]);
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

	const fetchTermOptions = (course, callback) => {
		Term.find({ 
			year: course.term.year,
			title: {
				$ne: course.term.title
			}
		}, {
			title: 1
		})
		.sort({ "date.start": -1 })
		.then(options => {
			if(options.length === 0) {
				return res.status(404).json({
					message: "Could not find your terms"
				});
			} else {
				return callback(null, { course, options });
			};
		})
		.catch(err =>{
			return res.status(500).json({
				message: err.message
			});
		});
	};

	async.waterfall([
		getCourse,
		fetchTermOptions
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(200).json(results);
		};
	});	
};

exports.update = (req, res) => {
	const { courseId } = req.params;
	const { term, code, title, credit, instructor, theme, createdAt } = req.body;
	
	Course.updateOne({ _id: courseId }, {
		$set: {
			_id: courseId,
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
	})
	.then(course => {
		if(!course) {
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

exports.delete = (req, res) => {
	const { courseId } = req.params;

	Course.deleteOne({ _id: courseId })
	.then(course => {
		if(!course) {
			return res.status(404).json({
				message: "No course found"
			});
		} else {
			return res.status(200).json({
				message: "Course deleted"
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