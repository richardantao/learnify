import React from "react";

/* Atoms */
import Icon from "../../atoms/Icon";
import Logo from "../../atoms/Logo";

import { Button } from "reactstrap";
import { 
	faTachometerAlt, faCalendarAlt, faTasks, faUniversity
} from "@fortawesome/free-solid-svg-icons";

import logo from "./learnify-min.png";

import "./AppNav.scss";

export default () => {
	return ( 
		<nav id="app-nav" role="navigation">
			<Logo className="logo" href="/beta/dashboard" src={logo} alt="Learnify Logo"/>
			<Button>
				<Icon icon={faTachometerAlt}/>
			</Button>
			<Button>
				<Icon icon={faCalendarAlt}/>
			</Button>
			<Button>
				<Icon icon={faTasks}/>
			</Button>
			<Button>
				<Icon icon={faUniversity}/>
			</Button>
		</nav>
	);
};