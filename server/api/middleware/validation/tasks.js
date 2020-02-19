const { body, validationResult } = require("express-validator");
const moment = require("moment");

const Course = require("../../models/Courses");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { course, title, type, deadline, completion, description } = req.body;

    body(course, "There was an error linking the task to a course")
        .exists().withMessage("There was an error linking the task to a course")
        .isMongoId().withMessage("There was an error linking the task to a course");
    
    body(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title field can only contain letters and numbers")
        .escape();
    
    body(type, "Type had an invalid input")
        .exists().withMessage("Type is a required field")
        .isAlpha().withMessage("Type field can only contain letters")
        .escape();

    body(deadline, "Deadline had an invalid input")
        .exists().withMessage("Deadline is a required field")
        .escape()
        .toDate();

    body(completion, "Completion had an invalid input")
        .optional()
        .isNumeric().withMessage("Completion field must contain a numeric value")
        .escape();

    body(description, "Description had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Description can only contain letters and numbers")
        .escape();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        Course.find({ _id: course }, {
            term: 1
        })
        .populate("term", [ "date" ])
        .limit(1)
        .then(termRange => {
            if(moment(termRange[0].term[0].date.start, "YYYY-MM-DD") > moment(deadline, "YYYY-MM-DD") || moment(termRange[0].term[0].date.end, "YYYY-MM-DD") < moment(deadline, "YYYY-MM-DD")) {
                return res.status(400).json({
                    message: "Task deadline must be inbetween the date of the term your course belongs to"
                });
            } else {
                return next();
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };
};