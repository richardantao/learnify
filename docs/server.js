require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

// middlware


// bootup
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});

// routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;