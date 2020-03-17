import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

import App from "./app/App";
import Public from "./public/Public";
import Team from "./team/Team";

import "bootstrap/dist/css/bootstrap.css";

const customHistory = createBrowserHistory();

render (
	<Router history={customHistory}>
		<Provider store={store}>
			<Public/>
			<App/>
			<Team/>
		</Provider>
		<App/>
	</Router>,
	document.querySelector("#learnify")
);

serviceWorker.register();