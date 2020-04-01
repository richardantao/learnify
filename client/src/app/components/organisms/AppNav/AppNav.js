import React, { Component } from "react";
import { NavLink } from "react-router-dom"; 

import { Col } from "reactstrap";

import { 
	faTachometerAlt, faCalendarAlt, faTasks, faUniversity
} from "@fortawesome/free-solid-svg-icons";

/* Atoms */
import Icon from "../../atoms/Icon";
import Logo from "../../atoms/Logo";

import logo from "./learnify-min.png";

import "./AppNav.scss";

export default class AppNav extends Component {
	state = {
		active: ""
	};

	componentDidMount() {
		this.setState({ });
	};

	componentDidUpdate(prevProps, prevState) {

	};

	setActive = active => {
		this.setState({ active });
	};

	render() {
		return ( 
			<nav id="app-nav" role="navigation">
				<Logo 
					className="logo" 
					href="/beta/dashboard" 
					src={logo} 
					alt="Learnify Logo" 
				/>
				<NavLink 
					to="/beta/dashboard" 
					className="btn" 
					activeClassName="active-link"
				>
					<Icon icon={faTachometerAlt}/>
				</NavLink>
				<NavLink 
					to="/beta/calendar" 
					className="btn" 
					activeClassName="active-link"
				>
					<Icon icon={faCalendarAlt}/>
				</NavLink>
				<NavLink 
					to="/beta/academics" 
					className="btn" 
					activeClassName="active-link"

				>
					<Icon icon={faUniversity}/>
				</NavLink>
				<NavLink 
					to="/beta/planner" 
					className="btn" 
					activeClassName="active-link"
				>
					<Icon icon={faTasks}/>
				</NavLink>
			</nav>
		);
	};
};