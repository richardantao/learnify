const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { term, code, title, credit, instructor, theme } = req.body;
    
    body(term, "An error occurred while linking your course to a term")
        .exists().withMessage("Your course wasn't linked to a term")
        .isMongoId().withMessage("An error occurred while linking your course to a term");

    body(code, "Code field had an invalid input")
        .exists().withMessage("Code is a required field")
        .isAlphanumeric().withMessage("Code can only contain letters and numbers")
        .escape();
    
    body(title, "Title field had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape();
    
    body(credit, "Credit field had an invalid input")
        .exists().withMessage("Credit is a required field")
        .isNumeric().withMessage("Credit must be a numerical value")
        .escape();
    
    body(instructor, "Instructor field had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Instructor can only contain letters and numbers")
        .escape();
    
    body(theme, "Theme field had an invalid input")
        .optional()
        .isHexColor().withMessage("Theme must be a hex code denoting your selected colour")
        .escape();

    if(Array.isArray(term) && term.length > 1 && credit < 1) {
        return res.status(400).json({
            message: "This course's credit must be 1 or greater for the course to belong to more than one term"
        });
    };

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        return next();
    };
};