const logger = require("../../config/logger");

module.exports = (req, res) => {
    const { error, errorInfo } = req.body;

    return logger.error(error, errorInfo);
};