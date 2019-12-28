import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
// import * as serviceWorker from "./serviceWorker";

const Index = () => <App/>

const customHistory = createBrowserHistory();

render(
	<Router history={customHistory}>
		<Index />
	</Router>,
	document.querySelector("#learnify")
);
