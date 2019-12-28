const { check, sanitize, validationResult } = require("express-validator");

const Course = require("../../models/Courses");

const validate = (req, res, next) => {
    const error = validationResult(req);
    const { course, title, type, deadline, completion, description } = req.body;

    check(course, "There was an error linking the Task to a Course")
        .exists().withMessage("There was an error linking the Task to a Course")
        .isMongoId().withMessage("There was an error linking the Task to a Course");
    
    check(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers");
    
    check(type, "Type had an invalid input")
        .exists().withMessage("Type is a required field")
        .isAlpha().withMessage("Type can only contain letters"); 

    check(deadline, "Deadline had an invalid input")
        .exists().withMessage("Deadline is a required field");

    check(completion, "Completion had an invalid input")
        .optional()
        .isNumeric().withMessage("");

    check(description, "Description had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Description can only contain letters and numbers")

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
        Course.find({ _id: course }, {
            term: 1
        })
        .populate("term", [ "date" ])
        .limit(1)
        .then(termRange => {
            if(termRange[0].term.date.start > start || termRange[0].term.date.end < end) {
                return res.status(422).json({
                    message: "Task deadline must be inside the date of the term your course is in"
                });
            } else {
                next();
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };
};

module.exports = validate;