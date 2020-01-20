/* --- Dependencies --- */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const compression = require("compression");

/* --- Configurations --- */
const app = express();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT;
const env = process.env.NODE_ENV || "development";
const corsOptions = ["https://learnify.ca", "https://www.learnify.ca", "http://localhost"];
require("./config/db");
require("./config/cache");

/* --- Middleware --- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (env === "production") {
	app.use(helmet());
	app.use(cors({ 
		origin: (origin, callback) => {
			if(corsOptions.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				console.log("Not allowed by CORS");
				callback(new Error("Not allowed by CORS"));
			};
		}
	}));
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.use(compression());
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
	app.use(cors());
};

/* --- Routes --- */
/* Beta  */
app.use("/api/v1/", require("./api/routes/auth"));
app.use("/api/v1/cron", require("./api/routes/cron"));
app.use("/api/v1/", require("./api/routes/users"));

app.use("/api/v1/", require("./api/routes/years"));
app.use("/api/v1/", require("./api/routes/terms"));
app.use("/api/v1/", require("./api/routes/courses"));
app.use("/api/v1/", require("./api/routes/classes"));
app.use("/api/v1/", require("./api/routes/assessments"));
app.use("/api/v1/", require("./api/routes/tasks"));

app.use("/api/v1/", require("./api/routes/search"));

/* Root */
app.use("/", require("./api/routes/root"));

/* Team */
app.use("/", require("./api/routes/team"));

/* Fetch Client Side Rendering */
app.get("*", (req, res) => {
	res.set("Cache-Control", "no-cache");
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

/* --- Bootup --- */
app.listen(port, () => {
	console.log(`Server running at ${host}:${port}/`);
});

module.exports = app;