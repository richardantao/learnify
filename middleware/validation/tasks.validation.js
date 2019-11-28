const { check, sanitize, validationResult } = require("express-validator");

// validate assessment date against its parent term
const User = require("../../models/User.model");

const validate = (req, res, next) => {
    const error = validationResult(req);
    const { Id, Title, title, type, deadline, completion, description } = req.body;

    check(Id, "There was an error linking the Task to a Course")
        .exists().withMessage("There was an error linking the Task to a Course")
        .isMongoId().withMessage("There was an error linking the Task to a Course");
    
    check(Title, "Course Title had an invalid input")
        .exists().withMessage("Course Title is a required field")
        .isAlphanumeric().withMessage("Course Title can only contain letters and numbers");
    
    check(title, "Task Title had an invalid input")
        .exists().withMessage("Task Title is a required field")
        .isAlphanumeric().withMessage("Task Title can only contain letters and numbers");
    
    check(type, "Task Type had an invalid input")
        .exists().withMessage("Task Type is a required field")
        .isAlpha().withMessage("Task Type can only contain letters"); 

    check(deadline, "Task Deadline had an invalid input")
        .exists().withMessage("Task Deadline is a required field");

    check(completion, "Task Completion had an invalid input")
        .optional()
        .isNumeric().withMessage("");

    check(description, "Task Description had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Task Description can only contain letters and numbers")

    sanitize(Title).escape();
    sanitize(title).escape();
    sanitize(type).escape();
    sanitize(deadline).escape().toDate();
    sanitize(completion).escape();
    sanitize(description).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        User.find({ "course._id": Id }, {
            "parent._id": 1
        })
        .then(termId => {
            User.find({ "term._id": termId }, {
                "term.date": 1
            })
        })
        .then(termRange => {
            if(termRange.start > start || termRange.end < end) {
                return res.status(422).json({
                    message: "Task deadline must lie inside the Term date range the course you selected is in"
                });
            } else {
                // if no errors from validation, call controller function
                next();
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while validating your submission"
            });
        });
    };
};

module.exports = validate;