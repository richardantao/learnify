const logger = require("../../config/logger");

module.exports = (req, res) => {
    const { error, errorInfo } = req.body;

    try {
        logger.error(error, errorInfo);
    } catch (e) {
        logger.error(`An error occured while logging a client-side error: ${error}, ${errorInfo}`);
    } finally {
        return res.status(200).json({ message: "We apologize for the inconvenience. We take errors very seriously, and will be addressing this issue shortly. If the error persists, we encourage you to contact the admin" });
    }
};