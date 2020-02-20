const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

const Class = require("../models/Classes");
const Course = require("../models/Courses");

exports.create = (req, res) => {
    const { course, title, start, end, frequency, by, interval, location, description } = req.body;

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            _id: 0,
            term: 1
        })
        .limit(1)
        .then(term => {
            if(term.length === 0) {
                return res.status(404).json({ message: "Could not find term" });
            } else {
                return callback(null, term[0].term);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    const createClass = (term, callback) => {
        Class.create({
            _id: ObjectId(),
            term,
            course,
            title,
            date: {
                start: moment(start, "YYYY-MM-DD, hh:mm"),
                end: moment(end, "YYYY-MM-DD, hh:mm")
            },
            frequency,
            by,
            interval,
            location,
            description
        })
        .then(classes => {
            return callback(null, classes);
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    async.waterfall([
        matchTerm,
        createClass,
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(201).json(results);
        };
    });
};

// will get all the classes in a specified term
exports.read = (req, res) => {
    const { termId } = req.params;

    Class.find({ term: termId }, {
        _id: 1,
        course: 1,
        title: 1,
        date: 1
    })
    .then(classes => {
        if(classes.length === 0) {
            return res.status(404).json({ message: "Classes not found" }); 
        } else {
            return callback(null, classes);
        };
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.filter = (req, res) => {
    const { courseId }  = req.params;
   
    Class.find({ course: courseId }, {
        _id: 1,
        course: 1,
        title: 1,
        date: 1,
    })
    .then(classes => {
        if(classes.length > 0) {
            return res.status(404).json({ message: "No classes found" });
        } else {
            return callback(null, classes);
        };
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.edit = (req, res) => {
    const { classId }  = req.params;

    const getClass = callback => {
        Class.find({ _id: classId }, {
            _id: 1,
            term: 1,
            course: 1,
            title: 1,
            date: 1,
            frequency: 1,
            by: 1,
            interval: 1,
            location: 1,
            description: 1
        })
        .then(classes => {
            if(classes.length === 0) {
                return res.status(404).json({ message: "Class not found" });
            } else {
                return callback(null, classes);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    const fetchCourseOptions = (classes, callback) => {
        Course.find({ term: termId }, {
            _id: 1,
            course: 1
        })
        .then(options => {
            if(options.length === 0) {
                return res.status(404).json({ message: "No course options found" }); 
            } else {
                return callback(null, { classes, options });
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    async.waterfall([
        getClass,
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
    const { classId } = req.params;
    const { course, title, start, end, frequency, by, interval, location, description } = req.body;

    const matchTerm = callback => {
        Course.find({ _id: course }, {
            _id: 0,
            term: 1,
        })
        .limit(1)
        .then(term => {
            if(!term) {
                return res.status(404).json({ message: "Terms not found" });
            } else {
                return callback(null, term[0].term);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        }); 
    };

    const updateClass = (term, callback) => {
        Class.findOneandUpdate({ _id: classId }, {
            $set: {
                _id,
                term,
                course,
                title,
                date: {
                    start: moment(start, "YYYY-MM-DD, hh:mm"),
                    end: moment(end, "YYYY-MM-DD, hh:mm"),
                },
                frequency,
                by,
                interval,
                location,
                description
            }
        })
        .then(classe => {
            if(classe.modifiedCount === 1) {
                return callback(null, { message: "Class updated" });
            } else {
                return res.status(404).json({ message: "Class not found" });
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };

    async.waterfall([
        matchTerm,
        updateClass
    ], (err, results) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(200).json(results);
        };
    });
};

exports.delete = (req, res) => {
    const classId = req.params;
    
    Class.deleteOne({ _id: classId })
    .then(classe => {
        if(classe.deletedCount === 1) {
            return res.status(200).json({ message: "Class deleted" });
        } else {
            return res.status(404).json({ message: "Class not found" });
        };
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({ message: "Class not found" });
        } else {
            return res.status(500).json({ message: err.message });
        };
    });
};