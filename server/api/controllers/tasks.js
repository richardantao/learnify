const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Term = require("../models/Terms");
const Task = require("../models/Tasks");
const Course = require("../models/Courses");

exports.create = (req, res) => {
    const { course, title, type, deadline, completion, description } = req.body;

    async.waterfall([
        callback => {
            Course.find({ _id: course }, {
                _id: 0,
                term: 1
            })
            .limit(1)
            .then(term => {
                return callback(null, term[0].term);
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        },
        (term, callback) => {
            Task.create({
                _id: ObjectId(),
                term,
                course,
                title,
                type,
                deadline: moment(deadline, "YYYY-MM-DD, hh:mm"),
                completion,
                description
            })
            .then(task => {
                return callback(null, task);
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        }
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(201).json(results);
        };
    });   
};

exports.read = (req, res) => {
    const { termId } = req.params;
    const { limit, initial, past } = req.query;

    if(limit) {
        Task.find({ 
            deadline: {
                $gte: moment().startOf("day"),
                $lt: moment().endOf("day").add(7, "days")
            }
        }, {
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
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    } else if(initial) {
        const findCurrentTerm = callback => {
            Term.find({
                "date.start": {
                    $lt: moment().startOf("day"),
                },
                "date.end": {
                    $gt: moment().startOf("day")
                }
            }, {
                _id: 1
            })
            .limit(1)
            .then(term => {
                return callback(null, term[0]);
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        };

        const fetchTasks = (term, callback) => {
            Task.find({ 
                term,
                deadline: {
                    $gte: moment()
                }
            }, {
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
                    return res.status(404).json({ message: "Tasks not found" });
                } else {
                    return callback(null, tasks);
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        };

        async.waterfall([
            findCurrentTerm,
            fetchTasks
        ], (err, results) => {
            if(err) {
                return res.status(500).json({ message: err.message });
            } else {
                return res.status(200).json(results);
            };
        });
    } else if(past) {
        Task.find({ 
            term: termId,
            deadline: {
                $lt: moment()
            }
        }, {
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
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    } else {
        Task.find({ 
            term: termId,
            deadline: {
                $gte: moment()
            }
        }, {
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
                return res.status(404).json({ message: "Tasks not found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };
};

exports.filter = (req, res) => {
    const { courseId } = req.params;
    const { past } = req.query;

    if(past) {
        Task.find({ 
            course: courseId,
            deadline: {
                $lt: moment()
            }
        }, {
            _id: 1,
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
                return res.status(404).json({ message: "No tasks found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    } else {
        Task.find({ 
            course: courseId,
            deadline: {
                $gte: moment()
            }
        }, {
            _id: 1,
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
                return res.status(404).json({ message: "No tasks found" });
            } else {
                return res.status(200).json(tasks);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };    
};

exports.edit = (req, res) => {
    const { taskId } = req.params;

    async.waterfall([
        callback => {
            Task.find({ _id: taskId }, {
                course: 1,
                title: 1,
                type: 1,
                deadline: 1,
                completion: 1,
                description: 1
            })
            .populate("course", [ "title", "term" ])
            .limit(1)
            .then(task => {
                if(task.length === 0) {
                    return res.status(404).json({ message: "Task not found" });
                } else {                
                    return callback(null, task[0]);
                };
            })
            .catch(err => {
                if(err.kind === "ObjectId") {
                    return res.status(404).json({ message: "Task not found" });
                } else {
                    return res.status(500).json({ message: err.message });
                };
            });
        },
        (task, callback) => {
            Course.find({ 
                term: task.course.term,
                title: {
                    $ne: task.course.title
                }
            }, {
                title: 1
            })
            .sort({ title: 1 })
            .then(options => {
                if(options.length === 0) {
                    return res.status(404).json({ message: "No task options found" });
                } else {
                    return callback(null, { task, options });
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        }
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(200).json(results);
        };
    });   
};

exports.update = (req, res) => {
    const { taskId } = req.params;
    const { course, title, type, deadline, completion, description } = req.body;

    async.waterfall([
        callback => {
            Course.find({ _id: course }, {
                _id: 0,
                term: 1
            })
            .limit(1)
            .then(term => {
                if(term.length === 0) {
                    return res.status(404).json({ message: "Term not found" });
                } else {
                    return callback(null, term[0].term);
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        },
        (term, callback) => {
            Task.updateOne({ _id: taskId }, {
                $set: {
                    term,
                    course,
                    title, 
                    type, 
                    deadline: moment(deadline, "YYYY-MM-DD, hh:mm"), 
                    completion, 
                    description
                }
            })
            .then(task => {
                if(task.n === 1) {
                    return callback(null, { message: "Task updated" });
                } else {
                    return res.status(404).json({ message: "Task not found" }); 
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        }
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(200).json(results);
        };
    });
};

exports.delete = (req, res) => {
    const { taskId } = req.params;

    Task.deleteOne({ _id: taskId })
    .then(task => {
        if(task.deletedCount === 1) {
            return res.status(200).json({ message: "Task deleted" });
        } else {
            return res.status(404).json({ message: "Task not found" });
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({ message: "Task not found" });
        } else {
            return res.status(500).json({ message: err.message });
        };
    });
};