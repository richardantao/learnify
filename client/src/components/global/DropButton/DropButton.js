import React, { Component } from "react";
import "./DropButton.scss"

export default class Dropbutton extends Component {
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
		let { isLoading } = this.state;
		if(isLoading) {
			return null;
		} else {	
			return (
				<div>

				</div>
			)
		}
	}
}