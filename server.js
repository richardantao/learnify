/* --- Dependencies --- */
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const compression = require("compression");

/* --- Configurations --- */
const app = express();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || "development";
require("./config/db");

/* --- Middleware --- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

if (env === "production") {
	app.use(helmet());
	app.use(express.static(path.resolve(__dirname, "client", "build")));
	logger((tokens, req, res) => {
		return [
		  tokens.method(req, res),
		  tokens.url(req, res),
		  tokens.status(req, res),
		  tokens.res(req, res, "content-length"), "-",
		  tokens["response-time"](req, res), "ms"
		].join(" ")
	});
} else {
	app.use(logger("dev"));
}

/* --- Routes --- */
/* Beta  */
app.use("/api/v1/", require("./routes/auth"));
app.use("/api/v1/cron", require("./routes/cron"));
app.use("/api/v1/", require("./routes/users"));

app.use("/api/v1/", require("./routes/years"));
app.use("/api/v1/", require("./routes/terms"));
app.use("/api/v1/", require("./routes/courses"));
app.use("/api/v1/", require("./routes/classes"));
app.use("/api/v1/", require("./routes/assessments"));
app.use("/api/v1/", require("./routes/tasks"));

app.use("/api/v1/", require("./routes/search"));
app.use("/api/v1/", require("./routes/integrations"));

/* Root */
app.use("/", require("./routes/root"));

/* Team */
app.use("/", require("./routes/team"));

/* Fetch Client Side Rendering */
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

/* --- Bootup --- */
app.listen(port, () => {
	console.log(`Server running at ${host}:${port}/`);
});

module.exports = app;