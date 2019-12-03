const async = require("async");
const moment = require("moment");

// import models
const User = require("../models/User.model").Model;

// instantiate constroller
const controller = [];

controller.index = (req, res) => {
    return res.direct(301, "/")
}

controller.month = (req, res) => {
    const { _id } = req.user[0];

    async.parallel({
        classes: (callback) => {
            User.find({ _id }, { // check projections
                "class._id": 1,
                "class.course": 1,
                "class.date": 1,
                "class.frequency": 1,
                "class.by": 1,
                "class.interval": 1,
                "class.location": 1
            })
            .populate({ path: "class.course", select: "title" })
            .sort({ "class.date.start": 1 })
            .then(classes => {
                if(!classes) {
                    return res.status(404).json({
                        message: "The server was unable to find your classes"
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
            User.find({ _id }, { 
                "task._id": 1,
                "task.course": 1,
                "task.title": 1,
                "task.type": 1,
                "task.deadline": 1
            })
            .populate({ path: "task.course", select: "title"})
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
            User.find({ _id }, {
                "assessment._id": 1,
                "assessment.course": 1,
                "assessment.title": 1,
                "assessment.type": 1,
                "assessment.date": 1,
                "assessment.location": 1
            })
            .populate({ path: "assessment.course", select: "title"})
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
                return res.status(500).json({
                    message: err.message || "An error occurred on the server while retrieving your assessments"
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message || "An error occured while processing your request"
            });
        } else {
            console.log(results);
        };
    });
};

controller.week = (req, res) => {
    const { _id } = req.user[0];

    async.parallel({
        classes: (callback) => {
            User.find({ _id }, { // check projections
                "class._id": 1,
                "class.course": 1,
                "class.date": 1,
                "class.frequency": 1,
                "class.by": 1,
                "class.interval": 1,
                "class.location": 1
            })
            .populate({ path: "class.course", select: "title" })
            .sort({ "class.date.start": 1 })
            .then(classes => {
                if(!classes) {
                    return res.status(404).json({
                        message: "The server was unable to find your classes"
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
            User.find({ _id },{
                "task._id": 1,
                "task.course": 1,
                "task.title": 1,
                "task.type": 1,
                "task.deadline": 1
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
            User.find({ _id }, {
                "assessment._id": 1,
                "assessment.course": 1,
                "assessment.title": 1,
                "assessment.type": 1,
                "assessment.date": 1,
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
                return res.status(500).json({
                    message: err.message || "An error occurred on the server while retrieving your assessments"
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message || "An error occured while processing your request"
            });
        } else {
            console.log(results);
        };
    });
};

controller.day = (req, res) => {
    const { _id } = req.user[0];

    async.parallel({
        classes: (callback) => {
            User.find({ _id }, { // check projections
                "class._id": 1,
                "class.course": 1,
                "class.date": 1,
                "class.frequency": 1,
                "class.by": 1,
                "class.interval": 1,
                "class.location": 1
            })
            .populate({ path: "class.course", select: "title" })
            .sort({ "class.date.start": 1 })
            .then(classes => {
                if(!classes) {
                    return res.status(404).json({
                        message: "The server was unable to find your classes"
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
            User.find({ _id },{
                "task._id": 1,
                "task.course": 1,
                "task.title": 1,
                "task.type": 1,
                "task.deadline": 1
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
            User.find({ _id }, {
                "assessment._id": 1,
                "assessment.course": 1,
                "assessment.title": 1,
                "assessment.type": 1,
                "assessment.date": 1,
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
                return res.status(500).json({
                    message: err.message || "An error occurred on the server while retrieving your assessments"
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message || "An error occured while processing your request"
            });
        } else {
            console.log(results);
        };
    });
};

controller.agenda = (req, res) => {
    const { _id } = req.user[0];

    async.parallel({
        classes: (callback) => {
            User.find({ _id }, { // check projections
                "class._id": 1,
                "class.course": 1,
                "class.date": 1,
                "class.frequency": 1,
                "class.by": 1,
                "class.interval": 1,
                "class.location": 1
            })
            .populate({ path: "class.course", select: "title" })
            .sort({ "class.date.start": 1 })
            .then(classes => {
                if(!classes) {
                    return res.status(404).json({
                        message: "The server was unable to find your classes"
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
            User.find({ _id },{
                "task._id": 1,
                "task.course": 1,
                "task.title": 1,
                "task.type": 1,
                "task.deadline": 1
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
            User.find({ _id }, {
                "assessment._id": 1,
                "assessment.course": 1,
                "assessment.title": 1,
                "assessment.type": 1,
                "assessment.date": 1,
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
                return res.status(500).json({
                    message: err.message || "An error occurred on the server while retrieving your assessments"
                });
            });
        }
    }, (err, results) => {
        if(err) {
            return res.status(500).json({
                message: err.message || "An error occured while processing your request"
            });
        } else {
            console.log(results);
        };
    });
};

controller.newClass = (req, res) => {
    const { _id } = req.user[0];

    User.find({ _id }, {
        "course._id": 1,
        "course.title": 1
    })
    .sort({ "course.meta.updateAt": -1 })
    .then(props => {
        if(!props) {
            return res.status(404).json({
                message: "The server was unable to find the resources needed to process your request"
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
}

controller.createClass = (req, res) => {
    const { _id } = req.user[0];
    const { course, title, start, end, frequency, by, interval, location, description } = req.body;

	User.updateOne({ _id }, {
        $push: {
            class: {
                _id: ObjectId(),
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
                description
            }
        }
    })
	.then(createdClass => {
		return res.status(200).json(createdClass);
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "An error occurred on the server while creating this class"
		})
	});
};

controller.editClass = (req, res) => {
    const { classId } = req.params;

    User.find({ "class._id": classId })
    .select("-meta")
    .populate({ path: "class.course", select: "title" })
    .limit(1)
    .then(classes => {
        if(!classes) {
            return res.status(404).json({
                message: "The server was unable to find this class"
            });
        } else {
            return res.status(200).json(classes);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).json({
                message: "The server was unable to find this class"
            });
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
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
            return res.status(404).json({
                message: "The server was unable to find the class you recently updated"
            }); 
        } else {
            return res.status(200).json(revisedClass);
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).json({
                message: "The server was unable to find the selected class"
            }); 
        } else {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while processing your request"
            });
        };
    });
};

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
        return res.status(200).json(deletedClass);
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message || "An error occurred on the server while processing your request"
        });
    });
};

module.exports = controller;