import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchClasses, editClass } from "../../../../actions/app/classes";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Col } from "reactstrap";

import "./CalendarWeek.scss";

class CalendarWeek extends Component{
	state = {

	};

	static propTypes = {
		error: PropTypes.object.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};
	
	async componentDidMount() {
		
	};

	componentDidUpdate(prevProps, prevState) {

	};

	render() {
		const { } = this.state;

		return (
			<Col id="calendar-week">

			</Col>
		);
	};
};

const mapStateToProps = state => ({
	error: state.error,
	classes: state.classes
});

const mapDispatchToProps = { fetchClasses, editClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeek);