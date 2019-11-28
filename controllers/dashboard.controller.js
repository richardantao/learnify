const async = require("async");
const moment = require("moment");

// import model
const User = require("../models/User.model").Model;

// instantiate models
const controller = [];

// GET dashboard data
controller.index = (req, res) => {
	const { _id } = req.user;

	async.parallel({
		classes: (callback) => {
			User.find({ 
				_id,	
				"class.start.date": { 
					$eq: moment().startOf("date").format("YYYY MMMM DD, hh:mm a")
				}
			}, { 
				"class._id": 1,
				"class.course": 1,
				"class.title": 1,
				"class.date": 1,
				"class.location": 1,
			})
			.populate({ path: "class.course", select: "title" })
			.sort({ "class.date.start": 1 })
			.then(classes => {
				if(!classes) {
					return res.status(404).json({
						message: "The classes attempting to be retrieved were not found"
					});
				} else {
					res.status(200).json(classes);
				};
			})
			.exec(callback)
			.catch(err => {
				return res.status(500).json({
					message: err.message || "An error occurred on the server while retrieving your classes"
				});
			});
		},
		tasks: (callback) => {
			User.find({
				_id,
				"task.deadline": {
					$gte: moment().startOf("date").format("YYYY MMMM DD"), // date is later than today
					$lte: moment().startOf("date").format("YYYY MMMM DD") + (1000*60*60*24*7) // date is less than 7 days from now
				}
			}, {
				"task._id": 1,
				"task.course": 1,
				"task.title": 1,
				"task.type": 1,
				"task.deadline": 1,
				"task.completion": 1
			})
			.populate({ path: "task.course", select: "title" })
			.sort({ "task.deadline": 1 })
			.then(tasks => {
				if(!tasks) {
					return res.status(404).json({
						message: "The server was unable to find your tasks"
					});
				} else {
					res.status(200).json(tasks);
				};
			})
			.exec(callback)
			.catch(err => {
				return res.status(500).json({
					message: err.message || "An error occurred on the server while retrieving your tasks"
				});
			});
		},
		assessments: (callback) => {
			User.find({
				_id,
				"assessment.date": {
					$gte: moment().startOf("date").format("YYYY MMMM DD"),
					$lte: moment().startOf("date").format("YYYY MMMM DD") + (1000*60*60*24*7) 
				}
			}, {
				"assessment._id": 1,
				"assessment.course": 1,
				"assessment.title": 1,
				"assessment.type": 1,
				"assessment.date": 1,
				"assessment.location": 1
			})
			.populate({ path: "assessment.course", select: "title" })
			.sort({ "assessment.date": 1 })
			.then(assessments => {
				if(!assessments) {
					return res.status(404).json({
						message: "The server was unable to find your assessments"
					});
				} else {
					res.status(200).json(assessments);
				};
			})
			.exec(callback)
			.catch(err => {
				return res.status(500).json({
					message: err.message || "An error occurred on the server while retrieving your assessments"
				});
			});
		}		
	}, (err, results) => {
		if(err) {
			throw err;
		} else {
			console.log("All the columns have been populated: " + results);
		};
	});
};

// GET display class editor for specific class
controller.editClass = (req, res) => {
	const { classId } = req.params;

	User.find({ "class._id": classId })
	.select("-meta")
	.populate({ path: "class.course", select: "title" })
	.limit(1)
	.then(classes => {
		if(!classes) {
			return res.status(404).json({
				message: "The class you selected was not found by the server"
			});
		} else {
			return res.status(200).json(classes);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The class you selected was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while retrieving the class"
			});
		};
	});
};

controller.updateClass = (req, res) => {
	const { classId } = req.params; 
    const { course, title, start, end, frequency, by, interval, location, description } = req.body;

	User.update({ "class._id": classId }, {	
		$set: {
			course,
			title,
			date: {
				start,
				end
			},
			frequency,
			by,
			interval,
			location,
			description,
			meta: {
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}				
		}
	})
	.save()
	.then(revisedClass => {
		if(!revisedClass) {
			return res.staus(404).json({
				message: "The class you recently updated was not found by the server"
			});
		} else {
			return res.status(200).json(revisedClass);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.staus(404).json({
				message: "The class you selected was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "The server experienced an error while updating your class"
			});
		};
	});
};

// DELETE class
controller.deleteClass = (req, res) => {
	const { classId } = req.params;

	User.update({ "class._id": classId }, {
		$pull: {
			class: {
				_id: classId
			}
		}
	})
	.then(deletedClass => {
		if(!deletedClass) {
			return res.status(400).json({
				message: "The class you are trying to delete was not found by the server"
			});
		} else {
			return res.status(200).json(deletedClass);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The class you are trying to delete was not found by the server"
			})
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this class"
			});
		};
	});
};


controller.newTask = (req, res) => {
	const { _id } = req.user;
	
	User.find({ _id }, {
		"course.id": 1,
		"course.title": 1
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
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find the resources needed for your request" 
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while processing your request"
			});
		};
	});
};

//
controller.createTask = (req, res) => {
	const { course, title, type, deadline, completion, description } = req.body;
	
	const Task = new Task({
		_id: ObjectId(),
		course,
		title,
		type,
		deadline,
		completion,
		description
	});

	Task.save()
	.then(newTask => {
		return res.status(201).json(newTask);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while creating this task"
		});
	});
};

controller.editTask = (req, res) => {
	const { taskId } = req.params;

	User.find({ "task._id": taskId })
	.select("-meta")
	.populate({ path: "task.course", select: "title" })
	.limit(1)
	.then(task => {
		if(!task) {
			return res.status(404).json({
				message: "The task you selected was not found by the server"
			});
		} else {
			return res.status(200).json(task);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The task you selected was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while retrieving the task"
			});
		};
	});
};

//
controller.updateTask = (req, res) => {
	const { taskId } = req.params;
	const { course, title, type, deadline, completion, description } = req.body;

	User.update({ "task._id": taskId }, {
		$set: {
			course,
			title,
			type,
			deadline,
			completion,
			description,
			meta: {
				updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
			}
		}
	})
	.save()
	.then(revisedTask => {
		if(!revisedTask) {
			return res.status(404).json({
				message: "The task you recently updated was not found by the server"
			});
		} else {
			return res.status(200).json(revisedTask);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The task you are attempting to update was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating this task"
			});
		};
	});
};

controller.deleteTask = (req, res) => {
	const { taskId } = req.params; 

	User.update({ "task._id": taskId }, {
		$pull: {
			task: {
				"task._id": taskId
			}
		}
	})
	.then(deletedTask => {
		if(!deletedTask) {
			return res.status(404).json({
				message: "The task you are trying to delete was not found by the server"
			});
		} else {
			if(err.kind === "" || err.name === "NotFound") {
				return res.status(404).json({
					message: "The task you are trying to delete was not found by the server"
				});
			} else {
				return res.status(200).json(deletedTask);
			};
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The task you are trying to delete was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this task"
			});
		};
	});
};

controller.editAssessment = (req, res) => {
	const { assessmentId } = req.params;

	User.find({ "assessment._id": assessmentId })
	.select("-meta")
	.populate({ path: "assessment.course", select: "title" })
	.limit(1)
	.then(assessment => {
		if(!assessment) {
			return res.status(404).json({
				message: "The assessment you selected was not found by the server"
			});
		} else {
			return res.status(200).json(assessment);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The assessment you selected was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while retrieving the assessment"
			});
		};
	});
};

controller.updateAssessment = (req, res) => {
	const { assessmentId } = req.params;
	const { course, title, type, start, end, location } = req.body;

	User.update({ "assessment._id": assessmentId }, {
		$set: {
			assessment: {
				course,
				title,
				type,
				date: {
					start,
					end
				},
				location,
				meta: {
					updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
				}
			}
		}
	})
	.save()
	.then(revisedAssessment => {
		if(!revisedAssessment) {
			return res.status(404).json({
				message: "The server could not find the assessment you recently updated"
			});
		} else {
			return res.status(200).json(revisedAssessment);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The assessment you are attempting to update was not found"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while updating this assessment"
			});
		};
	});
};

controller.deleteAssessment = (req, res) => {
	const { assessmentId } = req.params;

	User.update({ "assessment._id": assessmentId }, {
		$pull: {
			assessment: {
				_id: assessmentId
			}
		}
	})	
	.then(deletedAssessment => {
		if(!deletedAssessment) {
			return res.status(400).json({
				message: "The assessment you are trying to delete was not found by the server"
			});
		} else {
			return res.status(200).json(deletedAssessment);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).json({
				message: "The assessment you are trying to delete was not found by the server"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while deleting this assessment"
			});
		};
	});
};

module.exports = controller;