import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTachometerAlt, faCalendarAlt, faTasks, faGraduationCap,
	faUniversity, faSearch, faCog, faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Logo from "../Logo";

import "./Nav.scss";

class Nav extends Component {
	state = {

	};
	
	static propTypes = {

	};
	
	render() {
		return ( 
			<Fragment>
				<Logo/> 
				<nav className="beta-nav" role="navigation">
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
					<Button href="/beta/settings" className="secondary-nav-button">
						<FontAwesomeIcon icon={faCog}/>
					</Button>
					<Button href="/beta/help" className="secondary-nav-button">
						<FontAwesomeIcon icon={faQuestionCircle}/>
					</Button>
				</nav>
			</Fragment>
		);
	};
};

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);