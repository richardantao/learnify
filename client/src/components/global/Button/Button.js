import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Button.scss";

export default class ButtonReact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}
	}
	
	componentDidMount() {
		this.setState({

		});
	}

	render() {
		return <Button>{this.props.icon}{this.props.name}</Button>
	}
}

