const { check, sanitize, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { term, code, title, credit, instructor, theme } = req.body;
    
    check(term, "An error occurred while linking your course to a term")
        .exists().withMessage("Your course wasn't linked to a term")
        .isMongoId().withMessage("An error occurred while linking your course to a term");

    check(code, "Code had an invalid input")
        .exists().withMessage("Code is a required field")
        .isAlphanumeric().withMessage("Code can only contain letters and numbers");
    
    check(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers");
    
    check(credit)
        .exists().withMessage("Credit had an invalid input")
        .isNumeric().withMessage("Credit must be a numerical value");
    
    check(instructor, "Instructor had an invalid input")
        .isAlphanumeric().withMessage("Instructor can only contain letters and numbers");
    
    check(theme, "Theme had an invalid input")
        .optional()
        .isHexColor().withMessage("Theme must be a hex code denoting your selected colour");

    sanitize(code).escape();
    sanitize(title).escape();
    sanitize(credit).escape();
    sanitize(instructor).escape();
    sanitize(theme).escape();

    if(term.length > 1 && credit < 1) {
        return res.status(422).json({
            message: "This course's credit must be 1 or greater for the course to belong to more than one term"
        });
    };

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        return next();
    };
};