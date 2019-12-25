import React, { Component } from "react";
import "./Header.scss";

export default class Header extends Component {
	render() {
		return <h1>{this.props.header}</h1>		
	};
};

