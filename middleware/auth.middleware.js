const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_SECRET;

const auth = (req, res, next) => {
    // get token from header
    const token = req.header("x-auth-token");
    
    // send missing token error message if there isn't a token
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "No token, authorization denied"
        });
    } else {
        try {
        const decoded = jwt.verify(token, secret);
        
        req.user = decoded;

        res.status(200).json({
            success: true,
            message: "Token verified"
        });
        
        next();
        } catch (e) {
            res.status(400).json({ 
                success: false, 
                message: "Token is not valid" 
            });
        };
    };    
};

module.exports = auth;