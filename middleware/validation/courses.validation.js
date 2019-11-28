const { check, sanitize, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const { Id, code, title, credit, instructor, theme } = req.body;
    
    check(Id, "An error occurred while linking your course to a Term")
        .exists().withMessage("Your course wasn't linked to a term")
        .isMongoId().withMessage("An error occurred while linking your course to a Term");

    check(code, "Course Code had an invalid input")
        .exists().withMessage("Course Code is a required field")
        .isAlphanumeric().withMessage("Course Code can only contain letters and numbers");
    
    check(title, "Course Title had an invalid input")
        .exists().withMessage("Course Title is a required field")
        .isAlphanumeric().withMessage("Course Title can only contain letters and numbers");
    
    check(credit)
        .exists().withMessage("Credit had an invalid input")
        .isNumeric().withMessage("Credit must be a numerical value");
    
    check(instructor, "Instructor had an invalid input")
        .isAlphanumeric().withMessage("Course Instructor can only contain letters and numbers");
    
    check(theme, "Theme had an invalid input")
        .optional()
        .isHexColor().withMessage("Theme must be a hex code denoting your selected colour");

    sanitize(code).escape();
    sanitize(title).escape();
    sanitize(credit).escape();
    sanitize(instructor).escape();
    sanitize(theme).escape();

    if(!errors.isEmpty()) {
        return res.status().json({
            message: errors.message
        });
    } else {
        next();
    };
};

module.exports = validate;