import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";

import App from "../../client/src/App";

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

export default app.get("*", (req, res, next) => {
    res.send(`<!DOCTYPE HTML>
        <html>
            <head>

            </head>
            <body>
                <div id="learnify"></div>
            </body>
        </html>
    `);
})
