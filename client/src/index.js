import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";

const customHistory = createBrowserHistory();

render (
	<Router history={customHistory}>
		<App/>
	</Router>,
	document.querySelector("#learnify")
);

// register service worker
serviceWorker.register();