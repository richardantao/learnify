import React, { useState } from "react";
import { Link } from "react-router-dom"; 

/* Atoms */
import Icon from "../../atoms/Icon";
import Logo from "../../atoms/Logo";

import { 
	faTachometerAlt, faCalendarAlt, faTasks, faUniversity
} from "@fortawesome/free-solid-svg-icons";

import logo from "./learnify-min.png";

import "./AppNav.scss";

export default () => {
	return ( 
		<nav id="app-nav" role="navigation">
			<Logo className="logo" href="/beta/dashboard" src={logo} alt="Learnify Logo"/>
			<Link to="/beta/dashboard" className="btn">
				<Icon icon={faTachometerAlt}/>
			</Link>
			<Link to="/beta/calendar" className="btn">
				<Icon icon={faCalendarAlt}/>
			</Link>
			<Link to="/beta/academics" className="btn">
				<Icon icon={faUniversity}/>
			</Link>
			<Link to="/beta/planner" className="btn">
				<Icon icon={faTasks}/>
			</Link>
		</nav>
	);
};