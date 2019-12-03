const async = require("async");
const bcrypt = require("bcryptjs");
const moment = require("moment");

// import model
const User = require("../models/User.model");

// instantiate controller
const controller = [];

controller.index = (req, res) => {
	
};

controller.editProfile = (req, res) => {
	const { _id } = req.user[0];

	User.find({ _id }, {
		"name": 1,
		"email.address": 1,
		"location": 1
	})
	.limit(1)
	.then(profile => {
		if(!profile) {
			return res.status(404).json({
				message: "Your profile credentials were not found by the server"
			});
		} else {
			return res.status(200).json(profile);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request"
		});
	});
};

controller.updateProfile = (req, res) => {
	const { _id } = req.user[0];
	const { first, last, email, country, region, institution, school } = req.body; 

	User.updateOne({ _id }, {
		$set: {
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
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}
		}
	})
	.then(revisedUser => {
		if(!revisedUser) {
			return res.status(404).json({
				message: "The credentials you attempted to update were not received by the server"
			});
		} else {
			return res.status(200).json(revisedUser);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The account you are trying you update was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating your profile"
			});
		}
	});
};

controller.deleteProfile = (req, res) => {
	const { _id } = req.user[0];

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
				message: err.message || "An error occurred on the server while deleting your profile"
			});
		};
	});
};

// GET request to retrieve user's password in settings page
controller.editPassword = (req, res) => {
	const { _id } = req.user[0];

	User.find({ _id }, {
		password: 1
	})
	.limit(1)
	.then(password => {
		if(!password) {
			return res.status(404).json({
				message: "Your current password was not found by the server"
			});
		} else {
			return res.status(200).json(password);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error on the server occurred while processing your request"
		});
	});
};

// PUT request to update database with user's new password
controller.updatePassword = (req, res) => {
	const { _id } = req.user[0];
	const { password } = req.body;

	User.updateOne({ _id }, {
		$set: {
			password			
		}
	})
	.then(updatedPassword => {
		if(!updatedPassword) {
			return res.status(404).json({
				message: "The server was unable to find your new password. Please reload the page"
			});
		} else {
			return res.status(200).json(updatedPassword);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find your stored password. Please reload the page"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while updating your password"
			});	
		};
	});	
};

// GET request to retrieve user's preferences 
controller.editPreferences = (req, res) => {
	const { _id } = req.user[0];

	User.find({ _id }, {
		preferences: 1
	})
	.limit(1)
	.then(preferences => {
		if(!preferences) {
			return res.status(404).json({
				message: "The server was unable to find your preferences"
			});
		} else {
			return res.status(200).json(preferences);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find your preferences"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred while retrieving your preferences"
			});
		};
	});
};

// POST request to update user's personal app preferences
controller.updatePreferences = (req, res) => {
	const { _id } = req.user[0];
	const { startDay, startTime, defaultDuration, defaultCalendar, onEmailList } = req.body;

	User.updateOne({ _id }, {
		$set: {
			preferences: {
				startDay,
				startTime,
				defaultDuration,
				defaultCalendar,
				onEmailList
			}
		}
	})
	.then(revisedPreferences => {
		if(!revisedPreferences) {
			return res.status(404).json({
				message: "The server was unable to find the preferences you are trying to update"
			});
		} else {
			return res.status(200).json(revisedPreferences);
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

/* Future routes */

// GET request to retrieve user's third party integrations
controller.newIntegration = (req, res) => {
	const { _id } = req.user[0];

	User.find({ _id }, {
		"": 1	
	})
	.then(props => {
		if(!props) {
			return res.status(404).json({
				message: "The server was unable to find the resources needed for your request"
			});	
		} else {
			return res.status(200).json(props);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occured while processing your request"
		});
	});
};

// POST request to create third party integration connections
controller.createIntegration = (req, res) => {
	const { _id } = req.user[0];
	const { } = req.body;

	const Integration = new Integration({
		_id: ObjectId()
	});

	Integration.save()
	.then(newIntegration => {
		return res.status(201).json(newIntegration);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request"
		});	
	});
};

controller.editIntegration = (req, res) => {
	const { integrationId } = req.params;

	User.find({ integrationId }, {
		"": 1
	})
	.then(integration => {
		if(!integration) {
			return res.status(404).json({
				message: "The server was unable to find this integration"
			}); 
		} else {
			return res.status(200).json(integration);
		};
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occured on the server while processing your request"
		});
	});
};

// PUT request to update user's third party integrations
controller.updateIntegration = (req, res) => {
	const { integrationId } = req.params;
	const { } = req.body;

	User.update({ integrationId },{	
		$push: {
			integration: {

			}
		}
	})
	.save()
	.then(revisedIntegration => {
		return res.status(200).json(revisedIntegration);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request"
		});
	});
};

// PUT request to delete user's third party integrations
controller.deleteIntegration = (req, res) => {
	const { integrationId } = req.params;

	User.update({ "integration._id": integrationId }, {	
		$pull: {
			integration: {
				_id: integrationId
			}
		}
	})
	.then(deletedIntegration => {
		return res.status(200).json(deletedIntegration);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while processing your request"
		});
	});
};

module.exports = controller;