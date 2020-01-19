const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Course = require("../models/Courses");
const Term = require("../models/Terms");

const redis = require("../config/cache");
	
exports.create = (req, res) => {
	const redisKey = JSON.stringify(); // key takes the form `${_id}:courses` in production

	const saveToDb = callback => {
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
		.then(course => {
			callback(null, course);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message
			});
		});
	};

	const cacheResults = (course, callback) => {
		redis.del(redisKey);
		redis.setex(JSON.stringify(course._id), 3600, JSON.stringify(course));

		callback(null, { 
			course, 
			message: "New course created"
		});
	};

	async.waterfall([
		saveToDb, 
		cacheResults
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(500).json(results);
		};
	});
};

exports.read = (req, res) => {
	const { termId } = req.params;

	const redisKey = JSON.stringify();

	const checkCache = callback => {
		redis.get(redisKey, (err, cacheResult) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if(cacheResult) {
				callback(null, JSON.parse(cacheResult));
			} else {
				callback(null);	
			};
		});
	};

	const queryDb = (cacheResult, callback) => {
		if(cacheResult) {
			callback(null, cacheResult);
		} else {
			Course.find({ term: termId}, {
				term: 1,
				code: 1,
				title: 1,
				instructor: 1,
				credit: 1,
			})
			.populate("term", [ "title" ])
			.sort({ code: 1 })
			.then(courses => {
				if(courses.length === 0) {
					return res.status(404).json({
						message: "No courses were found"
					});
				} else {
					redis.setex(redisKey, 3600, courses);

					callback(null, courses);
				};
			})
			.catch(err => {
				return res.status(500).json({
					message: err.message
				});
			});
		};
	};
	
	async.waterfall([
		checkCache,
		queryDb
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

exports.edit = (req, res) => {
	const { courseId } = req.params;
	
	const checkCache = callback => {
		redis.get(JSON.stringify(courseId), (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if(cacheResult) {
				callback(null, JSON.parse(cacheResults));
			} else {
				callback(null);
			};
		});
	};

	const queryDb = (cacheResults, callback) => {
		if(cacheResult) {
			callback(null, cacheResults);
		} else {
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
					redis.setex(course[0]._id, 3600, JSON.stringify(course[0]));

					callback(null, course[0]);
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
	};

	const getTermOptions = (course, callback) => {
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
				callback(null, { course, options });
			};
		})
		.catch(err =>{
			return res.status(500).json({
				message: err.message
			});
		});
	};

	async.waterfall([
		checkCache,
		queryDb,
		getTermOptions
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

	const redisKey = JSON.stringify();
	
	const updateDb = callback => {
		const course = {
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
			$set: course
		})
		.then(course => {
			if(!course) {
				return res.status(404).json({
					message: "No course found"
				});
			} else {
				callback(null, course);
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

	const updateCache = (course, callback) => {
		redis.del(redisKey);

		redis.setex(course._id, 3600, course);

		callback(null, {
			course,
			message: "Course updated"
		});
	};

	async.waterfall([
		updateDb,
		updateCache
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

exports.delete = (req, res) => {
	const { courseId } = req.params;

	const redisKey = JSON.stringify();

	const clearCache = callback => {
		redis.del(redisKey);
		redis.del(JSON.stringify(courseId));

		callback(null);
	};
	
	const deleteFromDb = callback => {
		Course.deleteOne({ _id: courseId})
		.then(deletedCourse => {
			if(!deletedCourse) {
				return res.status(404).json({
					message: "No course found"
				});
			} else {
				callback(null);
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

	async.parallel([
		clearCache,
		deleteFromDb
	], (err, results) => {
		if(err) {
			return res.status(500).json({
				message: err.message
			});
		} else {
			return res.status(500).json({
				message: "Course deleted"
			});
		};
	});
};