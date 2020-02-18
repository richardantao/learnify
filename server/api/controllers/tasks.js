const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Task = require("../models/Tasks");
const Course = require("../models/Courses");

exports.create = (req, res) => {
    const { course, title, type, deadline, completion, description } = req.body;

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            _id: 0,
            term: 1
        })
        .limit(1)
        .then(term => {
            return callback(term[0].term);
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    const createTask = (term, callback) => {
        Task.create({
            _id: ObjectId(),
            term: term,
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
    };

    async.waterfall([
        matchTerm,
        createTask
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
    const { current } = req.query;

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
            return res.status(404).json({ message: "Tasks not found" });
        } else {
            return res.status(200).json(tasks);
        };
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.filter = (req, res) => {
    const { _id } = req.user;
    const { courseId } = req.params;
    const { current } = req.query;

    Task.find({ course: courseId }, {
        course: 1,
        title: 1,
        type: 1,
        deadline: 1,
        completion: 1,
        description: 1,
        meta: 1
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

exports.edit = (req, res) => {
    const { taskId } = req.params;

    const getTask = callback => {
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
    };
    
    const fetchCourseOptions = (task, callback) => {
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
    };

    async.waterfall([
        getTask,
        fetchCourseOptions
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

    const matchTerm = callback => {
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
    };

    const updateTask = (term, callback) => {
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
            if(!task) {
                return res.status(404).json({ message: "Task not found" }); 
            } else {
                return callback(null, task);
            };
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).json({ message: "Task not found" }); 
            } else {
                return res.status(500).json({ message: err.message});
            };
        });
    };

    async.waterfall([
        matchTerm,
        updateTask
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
        if(!task) {
            return res.status(404).json({ message: "Task not found" });
        } else {
            return res.status(200).json({ message: "Task deleted" });
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