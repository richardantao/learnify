require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_SECRET;

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    
    if(!token) {
        return res.status(401).json({ message: "Missing token, authorization denied" });
    } else {
        try {
            req.user = jwt.verify(token, secret);
        
            return next();
        } catch (err) {
            return es.status(400).json({ message: "Token is not valid" });
        };
    };    
};