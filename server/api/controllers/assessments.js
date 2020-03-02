const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Term = require("../models/Terms");
const Course = require("../models/Courses");
const Assessment = require("../models/Assessments");

// cache

exports.create = (req, res) => {
    const { course, title, type, start, end, location, weight, score } = req.body;

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
            Assessment.create({
                _id: ObjectId(),
                term,
                course,
                title,
                type,
                date: {
                    start: moment(start, "YYYY-MM-DD, hh:mm"),
                    end: (end ? moment(end, "YYYY-MM-DD, hh:mm"): null),
                },
                location,
                grade: {
                    weight,
                    score
                }
            })
            .then(assessment => {
                return callback(null, assessment);
            })
            .catch(err => {
                console.log(err);
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
        Assessment.find({ 
            "date.start": {
                $gt: moment().startOf("day"),
                $lt: moment().endOf("day").add(7, "days")
            }
        }, {
            _id: 1,
            course: 1,
            title: 1,
            type: 1,
            date: 1,
            location: 1
        })
        .populate("course", [ "title" ])
        .sort({ "date.start": 1 })
        .then(assessments => {
            if(assessments.length === 0) {
                return res.status(404).json({ message: "Assessments not found" });
            } else {
                return res.status(200).json(assessments);
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
        const fetchAssessments = (term, callback) => {
            Assessment.find({ 
                term,
                "date.start": {
                    $gte: moment()
                }
            }, {
                _id: 1,
                course: 1,
                title: 1,
                type: 1,
                date: 1,
                location: 1
            })
            .populate("course", [ "title" ])
            .sort({ "date.start": 1 })
            .then(assessments => {
                if(assessments.length === 0) {
                    return res.status(404).json({ message: "Assessments not found" });
                } else {
                    return callback(null, assessments);
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        };

        async.waterfall([
            findCurrentTerm,
            fetchAssessments
        ], (err, results) => {
            if(err) {
                return res.status(500).json({ message: err.message });
            } else {
                return res.status(200).json(results);
            };
        });
    } else if(past) {
        Assessment.find({ 
            term,
            "date.start": {
                $lt: moment()
            }
        }, {
            _id: 1,
            course: 1,
            title: 1,
            type: 1,
            date: 1,
            location: 1
        })
        .populate("course", [ "title" ])
        .sort({ "date.start": 1 })
        .then(assessments => {
            if(assessments.length === 0) {
                return res.status(404).json({ message: "Assessments not found" });
            } else {
                return res.status(200).json(assessments);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    } else {
        Assessment.find({ 
            term: termId,
            "date.start": {
                $gte: moment()
            }
        }, {
            _id: 1,
            course: 1,
            title: 1,
            type: 1,
            date: 1,
            location: 1
        })
        .populate("course", [ "title" ])
        .sort({ "date.start": 1 })
        .then(assessments => {
            if(assessments.length === 0) {
                return res.status(404).json({ message: "Assessments not found" });
            } else {
                return res.status(200).json(assessments);
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
        Assessment.find({ 
            course: courseId,
            "date.start": {
                $lt: moment()
            } 
        }, {
            course: 1,
            title: 1,
            type: 1,
            date: 1,
            location: 1
        })
        .populate("course", [ "title" ])
        .sort({ "date.start": 1 })
        .then(assessments => {
            if(assessments.length === 0) {
                return res.status(404).json({ message: "Assessments not found" });
            } else {
                return res.status(200).json(assessments);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    } else {
        Assessment.find({ 
            course: courseId,
            "date.start": {
                $gte: moment()
            } 
        }, {
            course: 1,
            title: 1,
            type: 1,
            date: 1,
            location: 1
        })
        .populate("course", [ "title" ])
        .sort({ "date.start": 1 })
        .then(assessments => {
            if(assessments.length === 0) {
                return res.status(404).json({ message: "Assessments not found" });
            } else {
                return res.status(200).json(assessments);
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };
};

exports.edit = (req, res) => {
    const { assessmentId } = req.params;

    async.waterfall([
        callback => {
            Assessment.find({ _id: assessmentId }, {
                course: 1,
                title: 1,
                type: 1,
                date: 1,
                location: 1,
                grade: 1
            })
            .populate("course", [ "title", "term" ])
            .limit(1)
            .then(assessment => {
                if(assessment.length === 0) {
                    return res.status(404).json({ message: "Assessment not found" });
                } else {
                    return callback(null, assessment[0]);
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        },
        (assessment, callback) => {
            Course.find({ 
                term: assessment.course.term,
                title: {
                    $ne: assessment.course.title
                }
            }, {
                title: 1
            })
            .sort({ title: 1 })
            .then(options => {
                if(options.length === 0) {
                    return res.status(404).json({ message: "Course options not found" });
                } else {
                    return callback(null, { assessment, options });
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
    const { assessmentId } = req.params;
    const { course, title, type, start, end, location, weight, score } = req.body;

    async.waterfall([
        callback => {
            Course.find({ _id: course }, {
                term: 1,
                _id: 0
            })
            .limit(1)
            .then(term => {
                if(term.length === 0) {
                    return res.status(404).json({ message: "Terms not found" });
                } else {
                    return callback(null, term[0].term);
                };
            })
            .catch(err => {
                return res.status(500).json({ message: err.message });
            });
        },
        (term, callback) => {
            Assessment.updateOne({ _id: assessmentId }, {
                $set: {
                    term,
                    course,
                    title,
                    type,
                    date: {
                        start: moment(start, "YYYY-MM-DD, hh:mm"),
                        end: (end ? moment(end, "YYYY-MM-DD, hh:mm"): null)
                    }, 
                    location,
                    grade: {
                        weight,
                        score
                    }
                }
            })
            .then(assessment => {     
                if(assessment.n === 1) {
                    return callback(null, { message: "Assessment updated" });
                } else {
                    return res.status(404).json({ message: "Assessment not found" });
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
    const { assessmentId } = req.params;

    Assessment.deleteOne({ _id: assessmentId })
    .then(assessment => {
        if(assessment.deletedCount === 1) {
            return res.status(200).json({ message: "Assessment deleted" });
        } else {
            return res.status(404).json({ message: "Assessment not found" });
        };
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};