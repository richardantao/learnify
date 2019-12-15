import React, { Component } from "react";
import logo from "./tutee-min.jpg"
import "./Logo.scss";

export default class Logo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true
		}
	}
	
	componentDidMount() {
		this.setState({
			isLoading: false
		});
	}

	render() {
		return <a href="/dashboard"><img src={logo} alt="Tutee logo and mascot" className="logo"/></a>
	}
}