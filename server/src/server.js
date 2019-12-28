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
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV;
const db = require("./api/config/db");

/* --- Middleware --- */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

/* --- Bootup --- */
app.listen(port, () => {
	console.log(`Your ${env} server is up and running on port ${port}`);
});

/* --- Routes --- */

/* Fetch Client Side Rendering */
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../../", "client", "build", "index.html"));
});

/* Beta  */
app.use("/v1/", require("./api/routes/auth"));
app.use("/v1/cron", require("./api/routes/cron"));
app.use("/v1/", require("./api/routes/users"));

app.use("/v1/", require("./api/routes/years"));
app.use("/v1/", require("./api/routes/terms"));
app.use("/v1/", require("./api/routes/courses"));
app.use("/v1/", require("./api/routes/classes"));
app.use("/v1/", require("./api/routes/assessments"));
app.use("/v1/", require("./api/routes/tasks"));

app.use("/v1/", require("./api/routes/search"));
app.use("/v1/", require("./api/routes/integrations"));

/* Root */
app.use("/", require("./api/routes/root"));

/* Team */
app.use("/", require("./api/routes/team"));

module.exports = app;