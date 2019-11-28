const async = require("async");
const moment = require("moment");

const User = require("../models/User.model").Model;

const controller = [];

controller.index = (req, res) => {
    const { _id } = req.user;

    async.parallel({
        tasks: (callback) => {
            User.find({ 
                _id, 
                "task.deadline": {
                    $gte: moment().startOf("date").format("YYYY MMMM DD")
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
                if(err.kind === "ObjectId") {
                    return res.status(404).json({
                        message: "The server was unable to find your tasks"
                    });
                } else {
                    return res.status(500).json({
                        message: err.message || "An error occurred on the server while retrieving your tasks"
                    });
                };
            });
        },
        assessments: (callback) => {
            User.find({
                _id,
                "assessment.date": {
                    $gte: moment().startOf("date").format("YYYY MMMM DD")
                }
            }, {
                "assessment._id": 1,
                "assessment.course": 1,
                "assessment.title": 1,
                "assessment.type": 1,
                "assessment.date": 1,
                "assessment.time": 1,
                "assessment.location": 1  
            })
            .populate({ path: "assessment.course", select: "title" })
            .sort({ "assessment.date.start": 1 })
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
                if(err.kind === "ObjectId") {
                    return res.status(404).json({
                        message: "The server was unable to find your assessments"
                    });
                } else {
                    return res.status(500).json({
                        message: err.message || "An error occurred on the server while retrieving your assessments"
                    });
                };
            });
        }
    }, (err, results) => {
        if(err) {   
            return res.status(500).json({
                error: err.message || "An error on the server occurred while processing your request"
            });
        } else {
            return res.status(200).json(results);
        };
    });
};

controller.past = (req, res) => {
    const { _id } = req.user;

    async.parallel({
        tasks: (callback) => {
            User.find({
                _id, 
                "task.deadline": {
                    $lt: moment().startOf("date").format("YYYY MMMM DD")
                }
            },{
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
                        message: "The server was unable to successfully find your tasks"
                    });
                } else {
                    res.status(200).json(tasks);
                }
            })
            .exec(callback)
            .catch(err => {
                if(err.kind === "ObjectId") {
                    return res.status(404).json({
                        message: "The server was unable to successfully find your tasks"
                    });
                } else {
                    return res.status(500).json({
                        message: err.message || "An error occured while retrieving your tasks"
                    });
                };
            });
        },
        assessments: (callback) => {
            User.find({
                _id,
                "assessment.date": {
                    $lt: moment().startOf("date").format("YYYY MMMM DD")
                }
            }, {
                "assessment._id": 1,
                "assessment.course": 1,
                "assessment.title": 1,
                "assessment.type": 1,
                "assessment.date": 1,
                "assessment.time": 1,
                "assessment.location": 1 
            })
            .populate({ path: "assessment.course", select: "title" })
            .sort({ "assessment.date.start": 1 })
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
                if(err.kind === "ObjectId") {
                    return res.status(404).json({
                        message: "The server was unable to successfully find your assessments"
                    });
                } else {
                    return res.status(500).json({
                        message: err.message || "An error occured while retrieving your assessments"
                    });
                };
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message || "The server experienced an error while processing your request"
            });
        } else {
            return res.status(200).json(results);
        };
    });
};

controller.newTask = (req, res) => {
    const { _id } = req.user;

    User.find({ _id }, {
        "course._id": 1, 
		"course.title": 1
    })
    .sort({ "course.meta.updatedAt": -1 })
	.then(courses => {
		if(!courses) {
			return res.status(404).json({
				message: "The server was unable to find your courses"
			});
		} else {
			return res.status(200).json(courses);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "The server was unable to find your courses"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while retrieving your courses"
			});
		}
	});
};

controller.createTask = (req, res) => {
    const { course, title, type, deadline, completion, description } = req.body;

    const Task = new Tasks({
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
    .limit(1)
	.then(task => {
		if(!task) {
			return res.status(404).json({
				message: "The server was unable to find this task"
			});
		} else {
			return res.status(200).json(task);
		};
	})
	.catch(err => {
		if(err.kind === "ObjectId") {
			return res.status(404).json({
				message: "the server was unable to find this task"
			});
		} else {
			return res.status(500).json({
				message: err.message || "An error occurred on the server while retrieving this task"
			});
		};
	});
};

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
    .then(revisedTask => {
        if(!revisedTask) {
            return res.status(404).json({
                message: "The server was unable to find your recently updated task"
            }); 
        } else {
            return res.status(201).json(revisedTask);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).json({
                message: "The server was unable to find this task"
            }); 
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
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
                message: "The server was unable to find this task"
            });
        } else {
            return res.status(200).json(deletedTask);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
                message: "The server was unable to find this task"
            });
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
            });
        };
    });
};

controller.newAssessment = (req, res) => {
    const { _id } = req.user;
    
    User.find({ _id }, {
        "course._id": 1,
        "course.title": 1
    })
    .sort({ "course.meta.updatedAt": -1 })
    .then(props => {
        if(!props) {
            return res.status(404).json({
                message: "The resources needed to process your request were not found"
            });
        } else {
            return res.status(200).json(props);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred on the server while processing your request"
        });
    });
};

controller.createAssessment = (req, res) => {
    const { course, title, type, location, start, end, weight, score } = req.body;

    const Assessment = new Assessment({
        _id: ObjectId(),
        course, 
        title, 
        type,  
        date: {
            start,
            end
        },
        location,
        grade: {
            weight, 
            score
        }
    });

    Assessment.save()
    .then(newAssessment => {
        return res.status(201).json(newAssessment);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred on the server while creating your new Assessment"
        });
    });
};

controller.editAssessment = (req, res) => {
    const { assessmentId } = req.params;

    User.find({ "assessment._id": assessmentId })
    .select("-meta")
    .limit(1)
    .then(assessment => {
        if(!assessment) {
            return res.status(404).json({
                message: "The server was unable to find this assessment"
            });
        } else {
            return res.status(200).json(assessment);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred on the server while processing your request"
        });
    });
};

controller.updateAssessment = (req, res) => {
    const { assessmentId } = req.params;
    const { course, title, type, location, start, end, weighting, score } = req.body;

    User.update({ "assessment._id": assessmentId }, {
        $set: {
            course,
            title,
            type,
            date: {
                start,
                end
            },
            location,
            grade: {
                weighting,
                score
            },
            meta: {
                updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
            }
        }
    })
    .then(revisedAssessment => {
        if(!revisedAssessment) {
            return res.status(404).json({
                message: "The server was unable to find your recently updated assessment"
            });
        } else {
            return res.status(200).json(revisedAssessment);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).json({
                message: "The server was unable to find this assessment"
            });
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
            });
        };
    });
};

controller.deleteAssessment = (req, res) => {
    const { assessmentId } = req.params;

    User.update({ "assessment._id": assessmentId }, {
        $pull: {
            assessment: {
                "assessment._id": assessmentId
            }
        }
    })
    .then(deletedAssessment => {
        if(!deletedAssessment) {
            return res.status(404).json({
                message: "The server was unable to find this assessment"
            });
        } else {
            return res.status(200).json(deletedAssessment);
        };       
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
                message: "The server was unable to find this assessment"
            });
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
            });
        };
    });
};

module.exports = controller;