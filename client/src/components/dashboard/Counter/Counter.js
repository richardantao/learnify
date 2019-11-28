import React, { Component } from "react";

import { connect } from "react-redux";
import { countData } from "../../../actions/functions/counter.action";
import PropTypes from "prop-types";

import "./Counter.scss";

class Counter extends Component {
	state = {

	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		countData: PropTypes.func.isRequired
	};

	componentDidMount() {
		
		// count instances on loaded
		this.props.countData();
	};

	render() {
		return(
			<figure className="counter">
				<svg width="100" height="100">
					<circle className="" cx="50" cy="50" r="46" strokeWidth="5"/>
			<foreignObject width="100" height="100">
				<div className="counter-index">
					<h6>{this.props.count}</h6>
				</div>
			</foreignObject>
			<foreignObject width="100" height="100">
				<div className="counter-type">
					<h6>{this.props.type}</h6>
				</div>
			</foreignObject>
				</svg>
			</figure>
		);
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { countData };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

