const async = require("async");
const bcrypt = require("bcryptjs");
const moment = require("moment");

// import model
const User = require("../models/User");

exports.editProfile = (req, res) => {
	const { _id } = req.user;
	
	User.find({ _id }, {
		"name": 1,
		"email.address": 1,
		"location": 1,
		"meta.user": 1
	})
	.limit(1)
	.then(profile => {
		if(!profile) {
			return res.status(404).json({
				message: "Your profile credentials were not found by the server"
			});
		} else {
			return res.status(200).json(profile[0]);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});
};

exports.updateProfile = (req, res) => {
	const { _id } = req.user;
	const { first, last, email, country, region, institution, school, createdAt } = req.body; 

	User.updateOne({ _id }, {
		$set: {
			_id,
			name: {
				first,
				last
			},
			email: {
				address: email,
			},
			location: {
				country,
				region,
				institution,
				school
			},
			meta: {
				user: {
					createdAt,
					updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
				}
			}
		}
	})
	.then(user => {
		if(!user) {
			return res.status(404).json({
				message: "The credentials you attempted to update were not received by the server"
			});
		} else {
			return res.status(200).json(user);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The account you are trying you update was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message
			});
		};
	});
};

exports.deleteProfile = (req, res) => {
	const { _id } = req.user;

	User.findByIdAndDelete({ _id })
	.then(deletedUser => {
		if(!deletedUser) {
			return res.status(404).json({
				message: "The server could not find the account you are trying to delete. Please try again."
			});
		} else {
			return res.status(200).json(deletedUser);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The server could not find the account you are trying to delete. Please try again."
			});	
		} else {
			return res.status(500).json({
				message: err.message
			});
		};
	});
};

// GET request to retrieve user's password in settings page
exports.editPassword = (req, res) => {
	const { _id } = req.user;

	User.find({ _id }, {
		password: 1,
		meta: 1
	})
	.limit(1)
	.then(password => {
		if(password.length === 0) {
			return res.status(404).json({
				message: "Your current password was not found by the server"
			});
		} else {
			return res.status(200).json(password[0]);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message
		});
	});	
	
};

// PUT request to update database with user's new password
exports.updatePassword = (req, res) => {
	const { _id } = req.user;
	const { password, createdAt } = req.body;

	User.updateOne({ _id }, {
		$set: {
			password,
			meta: { 
				user: {
					createdAt,
					updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
				}
			}			
		}
	})
	.then(password => {
		if(!password) {
			return res.status(404).json({
				message: "The server was unable to find your new password. Please reload the page"
			});
		} else {
			return res.status(200).json(password);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find your stored password. Please reload the page"
			});
		} else {
			return res.status(500).json({
				message: err.message
			});	
		};
	});	
};

// GET request to retrieve user's preferences 
exports.editPreferences = (req, res) => {
	const { _id } = req.user;

	User.find({ _id }, {
		_id: 1,
		preferences: 1,
		meta: 1
	})
	.limit(1)
	.then(preferences => {
		if(preferences.length === 0) {
			return res.status(404).json({
				message: "The server was unable to find your preferences"
			});
		} else {
			return callback(null, preferences[0]);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find your preferences"
			});
		} else {
			return res.status(500).json({
				message: err.message
			});
		};
	});
};

// POST request to update user's personal app preferences
exports.updatePreferences = (req, res) => {
	const { _id } = req.user;
	const { startDay, startTime, defaultDuration, defaultCalendar, onEmailList, createdAt } = req.body;

	User.updateOne({ _id }, {
		$set: {
			preferences: {
				startDay,
				startTime,
				defaultDuration,
				defaultCalendar,
				onEmailList
			},
			meta: { 
				user: {
					createdAt,
					updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
				}
			}
		}
	})
	.then(preferences => {
		if(!preferences) {
			return res.status(404).json({
				message: "The server was unable to find the preferences you are trying to update"
			});
		} else {
			return callback(null, preferences);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the preferences you are trying to update"
			});
		} else {
			return res.status(500).json({
				message: "An error occurred on the server while updating your preferences"
			});
		};
	});
};