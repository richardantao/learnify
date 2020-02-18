const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { subject, message } = req.body;

    body(subject, "Subject field had an invalid input")
        .exists().withMessage("Message is a required field")
        .isLength({ min: 5, max: 100 })
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