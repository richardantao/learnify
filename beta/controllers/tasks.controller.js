const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Task = require("../models/Tasks.model");
const Course = require("../models/Courses.model");

// initialize controller
const controller = [];

controller.create = (req, res) => {
    const { course, title, type, deadline, completion, description } = req.body;

    const matchTerm = (callback) => {
        Course.find({ _id: course }, {
            term: 1,
            _id: 0
        })
        .limit(1)
        .then(term => {
            if(term.length === 0) {
                return res.status(404).json({
                    message: "Could not find term"
                });
            } else {
                callback(null, term);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const createTask = (term, callback) => {
        Task.create({
            _id: ObjectId(),
            term: term[0].term,
            course,
            title,
            type,
            deadline,
            completion,
            description
        })
        .then(task => {
            callback(null, { 
                message: "New task created",
                task 
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    async.waterfall([
        matchTerm,
        createTask
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

controller.readAll = (req, res) => {
    // const { _id = req.user}

    Task.find({  }, {
        course: 1,
        title: 1,
        type: 1,
        deadline: 1,
        completion: 1,
        description: 1
    })
    .populate("course", [ "title" ])
    .sort({ deadline: 1 })
    .then(tasks => {
        if(tasks.length === 0) {
            return res.status(404).json({
                message: ""
            });
        } else {
            return res.status(200).json(tasks);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.filterByTerm = (req, res) => {
    const { termId } = req.params;


    Task.find({ term: termId }, {
        course: 1,
        title: 1,
        type: 1,
        deadline: 1,
        completion: 1,
        description: 1
    })
    .populate("course", [ "title" ])
    .sort({ deadline: 1 })
    .then(tasks => {
        if(tasks.length === 0) {
            return res.status(404).json({
                message: "No tasks found"
            });
        } else {
            return res.status(200).json(tasks);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.filterByCourse = (req, res) => {
    const { courseId } = req.params;

    Task.find({ course: courseId }, {
        course: 1,
        title: 1,
        type: 1,
        deadline: 1,
        completion: 1,
        description: 1
    })
    .populate("course", [ "title" ])
    .sort({ deadline: 1 })
    .then(tasks => {
        if(tasks.length === 0) {
            return res.status(404).json({
                message: "No tasks found"
            });
        } else {
            return res.status(200).json(tasks);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.edit = (req, res) => {
    const { taskId } = req.params;
    
    const getTask = (callback) => {
        Task.find({ _id: taskId }, {
            course: 1,
            title: 1,
            type: 1,
            deadline: 1,
            completion: 1,
            description: 1,
            meta: 1
        })
        .populate("course", [ "title", "term" ])
        .limit(1)
        .then(task => {
            if(task.length === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            } else {
                return callback(null, task);
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Task not found"
                });
            } else {
                return res.status(500).json({
                    message: err.message
                });
            };
        });
    };

    const getCourseOptions = (task, callback) => {
        Course.find({ 
            term: task[0].course.term[0],
            title: {
                $ne: task[0].course.title
            }
        }, {
            title: 1
        })
        .sort({ title: 1 })
        .then(options => {
            if(options.length === 0) {
                return res.status(404).json({

                });
            } else {
                callback(null, { task, options });
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            })
        });
    };

    async.waterfall([
        getTask,
        getCourseOptions
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

controller.update = (req, res) => {
    const { taskId } = req.params;
    const { course, title, type, deadline, completion, description, createdAt } = req.body;

    const matchTerm = (callback) => {
        Course.find({ _id: course }, {
            term: 1,
            _id: 0
        })
        .limit(1)
        .then(term => {
            if(term.length === 0) {
                return res.status(404).json({
                    message: "Could not find term"
                });
            } else {
                callback(null, term);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    const updateTask = (term, callback) => {
        const task = {
            term: term[0].term[0],
            course,
            title, 
            type, 
            deadline, 
            completion, 
            description,
            meta: {
                createdAt,
                updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
            }   
        };
    
        Task.updateOne({ _id: taskId }, {
            $set: task
        })
        .then(revisedTask => {
            if(!revisedTask) {
                return res.status(404).json({
                    message: "Task not found"
                }); 
            } else {
                callback(null, {
                    message: "Your task has been updated",
                    task
                });
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Task not found"
                }); 
            } else {
                return res.status(500).json({
                    message: err.message
                });
            };
        });
    };

    async.waterfall([
        matchTerm,
        updateTask
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

controller.delete = (req, res) => {
    const { taskId } = req.params;

    Task.deleteOne({ _id: taskId })
    .then(deletedTask => {
        if(!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        } else {
            return res.status(200).json({
                message: "Your task has been deleted"
            });
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
                message: "Task not found"
            });
        } else {
            return res.status(500).json({
                message: err.message
            });
        };
    });
};

module.exports = controller;