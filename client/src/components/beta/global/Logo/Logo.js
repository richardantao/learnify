import React from "react";

import logo from "./learnify-min.jpg"
import "../Nav.scss";

const Logo = () => {
	return <a href="/beta/dashboard"><img src={logo} alt="Learnify logo and mascot" className="logo"/></a>	
};

export default Logo;