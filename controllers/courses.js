const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// model
const Course = require("../models/Courses");
const Term = require("../models/Terms");

const redis = require("../config/cache");
	
exports.create = (req, res) => {
	const { _id } = req.user;
	const { term, code, title, instructor, credit, theme } = req.body;

	const redisCourseKey = `${_id}:courses`;

	const saveToDb = callback => {
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
			return callback(null, course);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message
			});
		});
	};

	const cacheResults = (payload, callback) => {
		redis.del(redisCourseKey);

		const course = {
			_id: payload._id,
			term: payload.term,
			code: payload.code,
			title: payload.title,
			instructor: payload.instructor,
			credit: payload.credit,
			theme: payload.theme,
			meta: {
				createdAt: payload.meta.createdAt,
				updatedAt: payload.meta.updatedAt
			}
		}

		redis.setex(JSON.stringify(course._id), 3600, JSON.stringify(course));

		delete course.meta;
	
		return callback(null, { 
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
	const { _id } = req.user;
	const { termId } = req.params;

	const redisKey = `${_id}:courses`;

	const checkCache = callback => {
		redis.get(redisKey, (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if(cacheResults) {
				return callback(null, cacheResults);
			} else {
				return callback(null);	
			};
		});
	};

	const queryDb = (cacheResults, callback) => {
		if(cacheResults) {
			redis.setex(redisKey, 3600, cacheResults);

			JSON.parse(cacheResults);

			const courses = cacheResults.map(course => {
				delete course.meta;
			});

			return callback(null, courses);
		} else {
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
			.then(payload => {
				if(payload.length === 0) {
					return res.status(404).json({
						message: "No courses were found"
					});
				} else {
					redis.setex(redisKey, 3600, JSON.stringify(payload));

					const courses = payload.map(course => {
						delete course.meta;
					});

					return callback(null, courses);
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
			} else if(cacheResults) {
				return callback(null, cacheResults);
			} else {
				return callback(null);
			};
		});
	};

	const queryDb = (cacheResults, callback) => {
		if(cacheResult) {
			redis.setex(JSON.stringify(courseId), 3600, cacheResults);

			return callback(null, JSON.parse(cacheResults));
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
	const { _id } = req.user;
	const { term, code, title, credit, instructor, theme, createdAt } = req.body;

	// add class keys when class models are finalized
	const redisCourseKey = `${_id}:courses`;
	const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
	const redisAssessmentsFilterKey = `${_id}:assessmentsFilter`;
	const redisTasksReadKey = `${_id}:tasksRead`;
	const redisTasksFilterKey = `${_id}:tasksFilter`;
	
	const updateDb = callback => {
		const course = {
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
	
		Course.updateOne({ _id: courseId }, {
			$set: course
		})
		.then(course => {
			if(!course) {
				return res.status(404).json({
					message: "No course found"
				});
			} else {
				return callback(null, course);
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
		redis.del(redisCourseKey);
		redis.del(redisAssessmentsReadKey);
		redis.del(redisAssessmentsFilterKey);
		redis.del(redisTasksReadKey);
		redis.del(redisTasksFilterKey);

		redis.setex(JSON.stringify(course._id), 3600, JSON.stringify(course));

		delete course.meta; 

		return callback(null, {
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

	// add class keys when class models are finalized
	const redisCourseKey = `${_id}:courses`;
	const redisAssessmentsReadKey = `${_id}:assessmentsRead`;
	const redisAssessmentsFilterKey = `${_id}:assessmentsFilter`;
	const redisTasksReadKey = `${_id}:tasksRead`;
	const redisTasksFilterKey = `${_id}:tasksFilter`;

	const clearCache = callback => {
		redis.del(redisCourseKey);
		redis.del(redisAssessmentsReadKey);
		redis.del(redisAssessmentsFilterKey);
		redis.del(redisTasksReadKey);
		redis.del(redisTasksFilterKey);
		redis.del(JSON.stringify(courseId));

		return callback(null);
	};
	
	const deleteFromDb = callback => {
		Course.deleteOne({ _id: courseId})
		.then(course => {
			if(!course) {
				return res.status(404).json({
					message: "No course found"
				});
			} else {
				return callback(null);
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