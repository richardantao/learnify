const async = require("async");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

// models
const Course = require("../models/Courses.model");
const Assessment = require("../models/Assessments.model");

// initialize controller
const controller = [];

controller.create = (req, res) => {
    const { course, title, type, start, end, location, weight, score } = req.body;

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

    const createAssessment = (term, callback) => {
        Assessment.create({
            _id: ObjectId(),
            term: term[0].term,
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
        })
        .then(assessment => {
            callback(null, {
                message: "New assessment created",
                assessment
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
        createAssessment
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

controller.read = (req, res) => {
    const { termId } = req.params;

    Assessment.find({ term: termId }, {
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
            return res.status(404).json({
                message: "Assessments not found"
            });
        } else {
            return res.status(200).json(assessments)
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.filter = (req, res) => {
    const { courseId } = req.params;

    Assessment.find({ course: courseId }, {
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
            return res.status(404).json({
                message: "Assessments not found"
            });
        } else {
            return res.status(200).json(assessments);
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

controller.edit = (req, res) => {
    const { assessmentId, termId } = req.params;
    
    getAssessment = (callback) => {
        Assessment.find({ _id: assessmentId }, {
            course: 1,
            title: 1,
            type: 1,
            date: 1,
            location: 1,
            grade: 1,
            meta: 1
        })
        .populate("course", [ "title", "term" ])
        .limit(1)
        .then(assessment => {
            if(assessment.length === 0) {
                return res.status(404).json({
                    message: "Assessment not found"
                });
            } else {
                callback(null, assessment);
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    getCourseOptions = (assessment, callback) => {
        Course.find({ 
            term: assessment[0].course.term[0],
            title: {
                $ne: assessment[0].course.title
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
                callback(null, { assessment, options });
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            })
        });
    };

    async.waterfall([
        getAssessment,
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
    const { assessmentId } = req.params;
    const { course, title, type, start, end, location, weight, score, createdAt } = req.body;

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

    const updateAssessment = (term, callback) => {
        
        const assessment = {
            term: term[0].term[0],
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
            },
            meta: {
                createdAt,
                updatedAt: moment().utc(moment.utc().format()).local().format("YYYY MM DD, hh:mm")
            }
        };
    
        Assessment.updateOne({ _id: assessmentId }, {
            $set: assessment
        })
        .then(revisedAssessment => {
            if(revisedAssessment.length === 0) {
                return res.status(404).json({
                    message: "No assessment found"
                });
            } else {
                callback(null, {
                    message: "Your assessment has been updated",
                    assessment
                });
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };

    async.waterfall([
        matchTerm,
        updateAssessment
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
    const { assessmentId } = req.params;

    Assessment.deleteOne({ _id: assessmentId })
    .then(deletedAssessment => {
        if(!deletedAssessment) {
            return res.status(404).json({
                message: "Assessment not found"
            });
        } else {
            return res.status(200).json({
                message: "Your assessment has been deleted"
            });
        };
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message
        });
    });
};

module.exports = controller;