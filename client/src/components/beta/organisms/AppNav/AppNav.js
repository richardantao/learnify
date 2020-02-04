import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTachometerAlt, faCalendarAlt, faTasks, faGraduationCap,
	faUniversity, faSearch, faCog, faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

import logo from "./learnify-min.png";
import "./AppNav.scss";

const AppNav = () => {
	return ( 
		<>
			<nav id="app-nav" role="navigation">
				<a href="/beta/dashboard">
					<img src={logo} className="logo" alt="Leanrnfy Logo"/>
				</a>
				<Button href="/beta/dashboard">
					<FontAwesomeIcon icon={faTachometerAlt}/>
				</Button>
				<Button href="/beta/calendar">
					<FontAwesomeIcon icon={faCalendarAlt}/>
				</Button>
				<Button href="/beta/academics">
					<FontAwesomeIcon icon={faUniversity}/>
				</Button>
				<Button href="/beta/planner">
					<FontAwesomeIcon icon={faTasks}/>
				</Button>
				{/* <Button href="/search">
					<FontAwesomeIcon icon={faSearch}/>
				</Button> */}

			</nav>
		</>
	);
};

export default AppNav;