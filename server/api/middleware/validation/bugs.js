const { check, sanitize, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    check();

    sanitize();

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors
        });
    } else {
        return next();
    };
};