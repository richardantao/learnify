const async = require("async");
const moment = require("moment");

// import models
const User = require("../models/User.model");

const controller = [];

controller.index = (req, res) => {
	Ass.find({
		"_id": req.params._id,
		"date": {
			$gte: moment().startOf("date").format("YYYY MMMM DD")
		}
	})
	.then(ass => {
		return res.json(ass);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occured while retrieving your assessments"
		});
	});
}

controller.past = (req, res) => {
	Assessment.find({
		"_id": req.params._id,
		"date": {
			$lt: moment().startOf("date").format("YYYY MMMM DD")
		}
	})
	.then(pastAssessments => {
		if(!pastAssessments) {
			return res.status(404).json({
				message: "The server was unable to successfully find your past assessments"
			});
		} else {
			return res.json(pastAssessments);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to successfully find your past assessments"
			});
		} else {
			return res.status(505).json({
				message: err.message || "An error occured while retrieving your past assessments"
			});
		}
	});
}

controller.new = (req, res) => {
	Users.find({
		"_id": req.params._id
	},
	{
		"": 1,
		"": 1,
		"": 1
	})
	.then(assProps => {
		if(!assProps) {
			return res.status(404).json({
				message: "The server was unable to find the resources needed to complete your request"
			});
		} else {
			return res.status(200).json(assProps);	
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the resources needed to complete your request"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while processing your request"
			});
		}
	})
}

controller.create = (req, res) => {
	const ass = new Assessment({
		userId: req.body.userId,
		course: {
			id: req.body.courseId,
			title: req.body.courseTitle
		},
		title: req.body.title,
		type: req.body.type,
	  	date: req.body.date,
		time: req.body.time,
		duration: req.body.duration,
		meta: {
			createdAt: Date.now(),
			updatedAt: Date.now()
		}
	});

	ass.save()
	.then(newAss => {
		res.json(newAss);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occured while creating this assessment"
		})
	});
}

controller.edit = (req, res) => {
	Assessment.findById(req.params.id)
	.then(selectedAss => {
		if(!selectedAss) {
			return res.status(404).json({
				message: "The assessment you selected was not successfully found"
			});
		} else {
			return res.json(selectedAss);
		}
	})
	.catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).json({
				message: "The assessment you selected was not successfully found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while retrieving this assessment"
			});
		}
	});
};

controller.update = (req, res) => {
	Assessment.findByIdAndUpdate({
		"_id": req.params.id
	}, 
	{
		$set: {
			title: req.body.title,
			type: req.body.type,
			location: req.body.location,
			date: req.body.date,
			time: req.body.time,
			duration: req.body.duration,
			grade: {
				weighting: req.body.weighting,
				score: req.body.score
			},
			meta: {
				updatedAt: Date.now()
			}
		}
	})
	.then(updatedAss => {
		if(!updatedAss) {
			return res.status(404).json({
				message: "The assessment you selected was not successfully found"
			});
		} else {
			return res.json(updatedAss);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The assessment you selected was not successfully found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while trying to update this assessment"
			});
		}
	});
}	

controller.delete = (req, res) => {
	Assessment.findByIdAndDelete({
		"_id": req.params._id
	})
	.then(deletedAss=> {
		if(!deletedAss) {
			return res.status(404).json({
				message: "The assessment you are attempting to delete was not successfully found"
			});
		} else {
			return res.json(deletedAss);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The assessment you are attempting to delete was not successfully found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while deleting this assessment"
			});
		}
	});
}

module.exports = controller;