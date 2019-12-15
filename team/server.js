require("dotenv").config();

const express = require("express");
const app = express();



app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});

module.exports = app;