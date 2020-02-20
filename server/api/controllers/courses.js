const async = require("async");
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
		credit,
		instructor,
		theme
	})
	.then(course => {
		return res.status(201).json({
			course,
			message: "Course created"
		});
	})
	.catch(err => {
		return res.status(500).json({ message: err.message });
	});
};

exports.read = (req, res) => {
	const { termId } = req.params;

	Course.find({ term: termId }, {
		code: 1,
		title: 1,
		instructor: 1,
		credit: 1
	})
	.sort({ code: 1 })
	.then(courses => {
		if(courses.length === 0) {
			return res.status(404).json({ message: "Courses not found" });
		} else {
			return res.status(200).json(courses);
		};
	})
	.catch(err => {
		return res.status(500).json({ message: err.message });
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
			theme: 1
		})
		.populate("term", [ "title", "year" ])
		.limit(1)
		.then(course => {
			if(course.length === 0) {
				return res.status(404).json({ message: "Course not found" });
			} else {
				return callback(null, course[0]);
			};
		})
		.catch(err => {
			return res.status(500).json({ message: err.message });
		});
	};

	const fetchTermOptions = (course, callback) => {
		Term.find({ 
			year: course.term[0].year,
			title: {
				$ne: course.term[0].title
			}
		}, {
			_id: 1,
			title: 1
		})
		.sort({ "date.start": -1 })
		.then(options => {
			if(options.length === 0) {
				return res.status(404).json({ message: "Could not find terms" });
			} else {
				return callback(null, { course, options });
			};
		})
		.catch(err =>{
			return res.status(500).json({ message: err.message });
		});
	};

	async.waterfall([
		getCourse,
		fetchTermOptions
	], (err, results) => {
		if(err) {
			return res.status(500).json({ message: err.message });
		} else {
			return res.status(200).json(results);
		};
	});	
};

exports.update = (req, res) => {
	const { courseId } = req.params;
	const { term, code, title, credit, instructor, theme } = req.body;
	
	Course.findOneAndUpdate({ _id: courseId }, {
		$set: {
			term,
			code,
			title,
			credit,
			instructor,
			theme
		}
	})
	.then(course => {
		if(!course) {
			return res.status(404).json({ message: "No course found" });
		} else {
			return res.status(200).json({ 
				course,
				message: "Course updated" 
			});
		};
	})
	.catch(err => {		
		return res.status(500).json({ message: err.message });
	});
};

exports.delete = (req, res) => {
	const { courseId } = req.params;

	Course.findOneAndDelete({ _id: courseId })
	.then(course => {
		if(!course) {
			return res.status(404).json({ message: "Course not found" });
		} else {
			return res.status(200).json({ message: "Course deleted" });
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({ message: "Course not found" });
		} else {
			return res.status(500).json({ message: err.message });
		};
	});
};