import React, { Component } from "react";
import "./Header.scss";

export default class Header extends Component {
	render() {
		const { header } = this.props; 

		return <h1>{header}</h1>		
	};
};

