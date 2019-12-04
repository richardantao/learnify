
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
app.use("/dashboard", require("./routes/dashboard.route"));
app.use("/calendar", require("./routes/calendar.route"));
app.use("/academics", require("./routes/academics.route"));
app.use("/planner", require("./routes/planner.route"));
app.use("/search", require("./routes/search.route"));
app.use("/settings", require("./routes/settings.route"));

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