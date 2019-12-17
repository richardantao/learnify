require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});

module.exports = app;