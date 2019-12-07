
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

// Configurations
const app = express();
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || "development";
const db = require("./config/db");

// Middleware - preprocessing 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/", require("./routes/public.route"));
app.use("/", require("./routes/auth.route"));
app.use("/cron", require("./routes/cron.route"));
app.use("/", require("./routes/users.route"));

app.use("/", require("./routes/years.route"));
app.use("/", require("./routes/terms.route"));
app.use("/", require("./routes/courses.route"));
app.use("/", require("./routes/classes.route"));
app.use("/", require("./routes/assessments.route"));
app.use("/", require("./routes/tasks.route"));

app.use("/search", require("./routes/search.route"));
app.use("/integrations", require("./routes/integrations.route"));

// Conditional environment routing
if(env === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "public", "index.html"));
	});
} else {
	app.use(express.static("public"));
	app.use(logger("dev"));
};

// Bootup
app.listen(port, () => {
	console.log(`Your ${env} server is up and running on port ${port}`);
});

module.exports = app;