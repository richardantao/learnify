import React from "react";

/* Icons */
import FaTachometerAlt from "../../icons/FaTachometerAlt";
import FaCalendarAlt from "../../icons/FaCalendarAlt";
import FaTasks from "../../icons/FaTasks";
import FaUniversity from "../../icons/FaUniversity";

/* Atoms */
import { Button } from "reactstrap";
import Logo from "../../atoms/Logo";

import logo from "./learnify-min.png";
import "./AppNav.scss";

export default () => {
	return ( 
		<nav id="app-nav" role="navigation">
			<Logo href="/beta/dashboard" src={logo} alt="Learnify Logo"/>			
			<Button type="button" href="/beta/dashboard" content={<FaTachometerAlt/>} />
			<Button type="button" href="/beta/calendar" content={<FaCalendarAlt/>} />
			<Button type="button" href="/beta/academics" content={<FaUniversity/>} />
			<Button type="button" href="/beta/planner" content={<FaTasks/>} />
		</nav>
	);
};