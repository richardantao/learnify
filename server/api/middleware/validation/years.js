const { body, validationResult } = require("express-validator");
const moment = require("moment");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { title, start, end } = req.body;

    body(title, "Title received an invalid input").isAlphanumeric().withMessage("The title can only include letters and numbers")
        .isLength({ min: 3, max: undefined }).withMessage("The title must be at least 3 characters")
        .escape();
        
    body(start, "Start date received an invalid input")
        .exists().withMessage("The start date is a required field")
        .toDate()
        .escape();

    body(end, "End date received an invalid input")
        .exists().withMessage("The end date is a required field")
        .toDate()
        .escape();

    if(moment(start, "YYYY-MM-DD") >= moment(end, "YYYY-MM-DD")) {
        return res.status(400).json({ message: "The start date must come before the end date" });
    };
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        return next();
    };
};