// dependencies
require("dotenv").config();
const express = require("express");

// configurations
const app = express();
const port = process.env.PORT || 3001;
const db = require("./config/db");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// bootup
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});

// routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

app.use("/v1/", require("./routes/auth"));

module.exports = app;