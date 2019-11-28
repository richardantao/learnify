const async = require("async");
const moment = require("moment");

// import models
const User = require("../models/User.model").Model;

// instantiate controller
const controller = [];

controller.index = (req, res) => {
	User.find({
		"_id": req.params._id, 
		"task.deadline": {
			$gte: moment().startOf("date").format("MMMM DD YYYY")
		}
	}, 
	{
		"task": 1
	})
    .then(tasks => {
		if(!tasks) {
			return res.status(404).json({
				message: "The server was unable to successfully find your tasks"
			});
		} else {
			return res.status(200).json(tasks);
		}
    }).catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to successfully find your tasks"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while retrieving your tasks"
			});
		}
    });
}

controller.past = (req, res) => {
	User.find({
		"_id": req.params._id, 
		"tasks.deadline": {
			$lt: moment().startOf("date").format("MMMM DD YYYY")
		}
	}, 
	{
		"tasks": 1
	})
	.then(pastTasks => {
		if(!pastTasks) {
			return res.status(404).json({
				message: "The server was unable to find the resources to complete your request"
			});
		} else {
			return res.status(200).json(pastTasks);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to successfully find your past tasks"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while retrieving your past tasks"
			});
		}
	});
}

controller.edit = (req, res) => {
	Tasks.findById({
		"_id": req.params._id
	})
	.then(selectedTask => {
		if(!selectedTask) {
			return res.status(404).json({
				message: "This task could not be successfully found"
			});
		} else {
			return res.json(selectedTask);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "This task could not be successfully found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while retrieving this task"
			});
		}
	});
}

controller.new = (req, res) => {	
	User.find({
		"_id": req.params._id
	}, 
	{
		"module.title": 1
	})
	.then(selectedModules => {
		if(!selectedModules) {
			return res.status(404).json({
				message: "The server was unable to successfully find your courses"
			});
		} else {
			return res.status(200).json(selectedModules);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to successfully find your courses"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while retrieving your courses"
			});
		}
	});
}

controller.create = (req, res) => {
	async.waterfall([
		create,
		associate
	],(err, results) => {
		if(err) {
			throw err;
		} else {
			console.log("The results have arrived: " + results)
		}
	});

	const create = (callback) => {
		const task = new Tasks({
			userId: req.body.userId,
			module: {
				id: req.body.moduleId,
				title: req.body.moduleTitle
			},
			title: req.body.title,
			type: req.body.type,
			deadline: req.body.deadline,
			meta: {
				createdAt: Date.now(),
				updatedAt: Date.now()
			}
		});
	
		task.save()
		.then(newTask => {
			return res.json(newTask);
		})
		.exec(callback)
		.catch(err => {
			return res.status(500).json({
				message: err.message || "An error occured while creating this task"
			});
		});
	}

	const associate = (callback) => {
		Tasks.findByIdAndUpdate({
			"_id": req.params._id
		},
		{
			$set: {

			}
		})
		.then(associatedTask => {
			if(!associatedTask) {
				return res.status(404).json({
					message: "The server was unable to find the resources to process your request"
				});
			} else {
				return res.status(200).json(associatedTask);
			}
		})
		.exec(callback)
		.catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).json({
					message: "The server was unable to find the resources to process your request"
				});
			} else {
				return res.status(500).json({
					message: err.message || "An error occured while processing your request"
				});
			}
		});
	}

	next();	
}

controller.update = (req, res) => {
	Tasks.findByIdAndUpdate({
		"_id": req.params._id
	}, 
	{
		$set: {
			title: req.body.title,
			type: req.body.type,
			deadline: req.body.deadline,
			completion: req.body.completion,
			note: req.body.note,
			meta: {
				updatedAt: Date.now()
			}
		}
	})
	.then(updatedTask => {
		if(!updatedTask) {
			return res.status(404).json({
				message: "This task was not successfully found"
			});
		} else {
			return res.json(updatedTask);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "This task was not successfully found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while updating this task"
			});
		}
	})
}	

controller.delete = (req, res) => {
	Tasks.findByIdAndDelete({
		"_id": req.params._id
	})
	.then(deletedTask => {
		if(!deletedTask) {
			return res.status(400).json({
				message: "This task was not successfully found"
			});
		} else {
			return res.json(deletedTask);
		}
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "This task was not successfully found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occured while deleting this task"
			})
		}
	});
}

module.exports = controller;






