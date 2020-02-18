const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { where, type, message } = req.body;

    body(where)
        .exists().withMessage("Where is a required field")
        .escape();

    body(type)
        .exists().withMessage("Type is a required field")
        .escape();

    body(message, "Message field had an invalid input")
        .exists().withMessage("Message is a required field")
        .isLength({ min: 30, max: 500 }).withMessage("Message must be between 15 and 500 characters")
        .escape();


    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        return next();
    };
};