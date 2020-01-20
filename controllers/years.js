const moment = require("moment");

const Year = require("../models/Years");
const ObjectId = require("mongodb").ObjectId;

const redis = require("../config/cache");

exports.create = (req, res) => {
	// const { _id } = req.user;
	const { title, start, end } = req.body;

	const redisKey = JSON.stringify(); // _id:years 

	const saveToDb = callback => {
		Year.create({
			_id: ObjectId(),
			user: ObjectId("5deb33a40039c4286179c4f1"), // get from cookie in production
			title,
			date: {
				start,
				end
			}
		})
		.then(payload => {
			callback(null, payload);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message
			});
		});
	};

	const cacheResults = (payload, callback) => {
		redis.del(redisKey); // pass `${_id}:years` key

		const year = {
			_id: payload._id,
			title: payload.title,
			date: {
				start: payload.date.start,
				end: payload.date.end
			},
			meta: {
				createdAt: payload.meta.createdAt,
				updatedAt: payload.meta.updatedAt
			}
		};

		// cache payload
		redis.setex(JSON.stringify(year._id), 3600, JSON.stringify(year));

		// remove meta properties before sending payload
		if(year.meta) {
			delete year.meta;
		};

		callback(null, { 
			message: "New year created",
			year
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
			return res.status(201).json(results);
		};
	});
};

exports.read = (req, res) => {
	// const { _id } = req.user;
	const redisKey = JSON.stringify(); // key takes the form `${_id}:years` in production

	const checkCache = callback => {
		redis.get(redisKey, (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if(cacheResults) {
				callback(null, cacheResults);
			} else {
				callback(null);
			};
		});
	};

	const queryDb = (cacheResults, callback) => {
		if(cacheResults) {
			redis.setex(redisKey, 3600, cacheResults);

			callback(null, JSON.parse(cacheResults));
		} else {
			Year.find({ user: ObjectId("5deb33a40039c4286179c4f1") }, {
				_id: 1,
				title: 1,
				date: 1,
				meta: 1
			})
			.sort({ "date.start": -1 })
			.then(payload => {
				if(payload.length === 0) {
					return res.status(404).json({
						message: "No years were found"
					});
				} else {
					redis.setex(redisKey, 3600, JSON.stringify(payload));

					const years = payload.map(year => {
						if(year.meta) {
							delete year.meta;
						} else {
							return year;
						};
					});

					callback(null, years);
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
	const { yearId } = req.params;

	const checkCache = callback => {
		redis.get(JSON.stringify(yearId), (err, cacheResults) => {
			if(err) {
				return res.status(500).json({
					message: err.message
				});
			} else if (cacheResults) {
				callback(null, cacheResults);
			} else {
				callback(null);
			};
		});
	};

	const queryDb = (cacheResults, callback) => {
		if (cacheResults) {
			redis.setex(JSON.stringify(yearId), 3600, cacheResults);

			callback(null, JSON.parse(cacheResults));
		} else {		
			Year.find({ _id: yearId }, {
				_id: 1,
				title: 1,
				date: 1,
				meta: 1
			})
			.limit(1)
			.then(year => {
				if(year.length === 0) {
					return res.status(404).json({
						message: "Year not found"
					});
				} else {
					redis.setex(JSON.stringify(year[0]._id), 3600, JSON.stringify(year[0]));

					callback(null, year[0]);
				};
			})
			.catch(err => {
				if(err.kind === "ObjectId") {
					return res.status(404).json({
						message: "Year not found"
					});
				} else {
					return res.status(500).json({
						message: err.message
					});
				};
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

exports.update = (req, res) => {
	const { yearId } = req.params;
	const { title, start, end, createdAt } = req.body;

	const redisKey = JSON.stringify(); // key takes the form `${_id}:years` in production

	const updateDb = callback => {
		const update = {
			user,
			title,
			date: {
				start,
				end
			},
			meta: {
				createdAt,
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}
		};
	
		Year.updateOne({ _id: yearId }, {
			$set: update
		})
		.then(year => {
			if(year.length === 0) {
				return res.status(404).json({
					message: "Year not found"
				});
			} else {
				callback(null, year);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).json({
					message: "Year not found"
				});
			} else {
				return res.status(500).json({
					message: err.message
				});
			};
		});
	};

	const updateCache = (year, callback) => {
		redis.del(redisKey);

		redis.setex(JSON.stringify(year._id), 3600, JSON.stringify(year));
		
		delete year.meta;

		callback(null, {
			message: "Your year has been updated",
			year
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
	const { yearId } = req.params;

	const redisKey = JSON.stringify(); // key takes the form `${_id}:years` in production

	const clearCache = callback => {
		redis.del(JSON.stringify(yearId));
		redis.del(redisKey);

		callback(null);
	};

	const deleteFromDb = callback => {
		Year.deleteOne({ _id: yearId })
		.then(deletedYear => {
			if(!deletedYear) {
				return res.status(404).json({
					message: "Year not found"
				});
			} else {
				callback(null);
			};
		})
		.catch(err => {
			if(err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).json({
					message: "The server was unable to find the selected academic year"
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
			return res.status(200).json({
				message: "Your year has been deleted"
			});
		};
	});
};