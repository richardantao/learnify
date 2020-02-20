const { body, validationResult } = require("express-validator");
const moment = require("moment");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { course, title, start, end, frequency, by, interval, location, description } = req.body;

    const momentStart = moment(start, "YYYY-MM-DD");
    const momentEnd = moment(end, "YYYY-MM-DD");

    body(course, "An error occurred while linking your class to a course")
        .exists().withMessage("Your class wasn't linked to a course")
        .isMongoId().withMessage("An error occurred while linking your class to a course");

    body(title, "Title field had an invalid input")
        .exists().withMessage("Title is a required field")
        .isLength({ min: 3, max: undefined }).withMessage("")
        .escape();

    body(start, "Start date field had an invalid input")
        .exists().withMessage("Start date is a required field")
        .escape()
        .toDate();

    body(end, "End date field had an invalid input")
        .exists().withMessage("End date is required field")
        .escape()
        .toDate();

    body(frequency, "Frequency field had an invalid input")
        .exists().withMessage("Frequency is a required field")
        .escape();

    body(by, "By field had an invalid input")
        .optional()
        .isNumeric().withMessage("By must be a numerical value")
        .escape();

    body(interval, "Interval field had an invalid input")
        .optional()
        .isNumeric().withMessage("")
        .escape();

    body(location, "Location field had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Location can only contain letters and numbers")
        .escape();

    body(description, "Description field had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Description can only contain letters and numbers")
        .escape();

    if(moment(start, "YYYY-MM-DD") >= moment(end, "YYYY-MM-DD")) {
        return res.status(400).json({ message: "Start date must come before end date" });
    };
        
    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        Course.find({ _id: course }, { 
            term: 1,
            _id: 0
        })
        .populate("term", [ "date" ])
        .limit(1)
        .then(termRange => {
            const termRangeStart = moment(termRange[0].term[0].date.start, "YYYY-MM-DD");
            const termRangeEnd = moment(termRange[0].term[0].date.end, "YYYY-MM-DD");

            if(momentStart < termRangeStart || momentEnd > termRangeEnd ) {
                return res.status(400).json({
                    message: "The assessment date must be inbetween the date of the term your course belongs to"
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