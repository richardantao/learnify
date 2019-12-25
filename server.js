/* --- Dependencies --- */
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

/* --- Configurations --- */
const app = express();
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV;
const db = require("./config/db");

/* --- Middleware --- */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* --- Bootup --- */
app.listen(port, () => {
	console.log(`Your ${env} server is up and running on port ${port}`);
});

/* --- Routes --- */

/* Fetch Client Side Rendering */
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

/* Beta  */
app.use("/v1/", require("./routes/auth"));
app.use("/v1/cron", require("./routes/cron"));
app.use("/v1/", require("./routes/users"));

app.use("/v1/", require("./routes/years"));
app.use("/v1/", require("./routes/terms"));
app.use("/v1/", require("./routes/courses"));
app.use("/v1/", require("./routes/classes"));
app.use("/v1/", require("./routes/assessments"));
app.use("/v1/", require("./routes/tasks"));

app.use("/v1/", require("./routes/search"));
app.use("/v1/", require("./routes/integrations"));

/* Root */
app.use("/", require("./routes/root"));

/* Team */
app.use("/", require("./routes/team"));

module.exports = app;