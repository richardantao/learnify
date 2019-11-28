const { check, sanitize, validationResult } = require("express-validator");

// import model to compare date of Assessment's date to the date range of the Term the Course is in
const User = require("../../models/User.model");

// VERIFY DATE CHAINING AND VALIDATION
const validate = (req, res, next) => {
    const error = validationResult(req);
    const { Id, Title, title, type, start, end, location, weight, score } = req.body;

    check(Id, "There was an error linking your Assessment to a Course")
        .exists().withMessage("There was an error linking your Assessment to a Course")
        .isMongoId().withMessage("There was an error linking your Assessment to a Course");
    
    check(Title, "Course had an invalid input")
        .exists().withMessage("Course Title is a required field")
        .isAlphanumeric().withMessage("Course Title can only contain letters and numbers");

    check(title, "Title had an invalid input")
        .exists().withMessage("Assessment Title is a required field")
        .isAlphanumeric().withMessage("");
    
    check(type, "Type had an invalid input")
        .exists().withMessage("Assessment Type is a required field")
        .isAlphanumeric().withMessage("Assessment Type can only contain letters and numbers");

    check(start, "Start Date")
        .exists().withMessage("Start Date is a required field");

    check(end, "End Date had an invalid input")
        .exists().withMessage("End Date is a required field");

    check(location, "Location had an invalid input")
        .optional()
        .isAlpha().withMessage("Location can only contain letters");

    check(weight, "Grade Weight had an invalid input")
        .optional()
        .isNumeric().withMessage("Weight must be a numerical value");

    check(score, "Grade Score had an invalid input")
        .optional()
        .isNumeric().withMessage("Grade Score must be a numerical value");

    sanitize(Title).escape().toString();
    sanitize(title).escape().toString();
    sanitize(type).escape().toString();
    sanitize(start).escape().toDate();
    sanitize(end).escape().toDate();
    sanitize(location).escape().toString();
    sanitize(weight).escape().toFloat();
    sanitize(score).escape().toFloat();

    // check ranges of weight and score

    if(weight > 100 || weight < 0) {
        return res.status(422).json({
            message: "Weight must be a percentage value between 0 and 100"
        });
    };
    
    if(score > 100 || score < 0) {
        return res.status(422).json({
            message: "Score must a percentage value betwee 0 and 100 "
        });
    };

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        User.find({ "course._id": Id }, {
            "course.parent._id": 1
        })
        .then(termId => {
            User.find({ "term._id": termId }, {
                "term.date": 1
            })
        })
        .then(termRange => {
            if(termRange.start > start || termRange.end < end) {
                return res.status(422).json({
                    message: "The Assessment date must be inside the date of the Term your Course is in"
                });
            } else {
                // if request makes it through validation, call controller function
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