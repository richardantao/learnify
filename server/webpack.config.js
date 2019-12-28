const path = require("path");

module.exports = {
    entry: {
        api: "./src/index.js", // TBD
        server: "./src/server.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};