import React, { Component } from "react";

import Moment from "react-moment";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Col } from "reactstrap";

import "./CalendarMonth.scss";

class CalendarMonth extends Component {
	state = {
		currentMonth: new Date(),
		selectedDate: new Date()
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired
	};
	
	componentDidMount() {
		
	};

	componentDidUpdate(prevProps) {

	};

	renderHeader = () => {

	};

	renderDays = () => {

	};

	renderCells = () => {

	};

	handleDateClick = day => {

	};

	nextMonth = () => {

	};

	prevMonth = () => {

	};

	render() {
		return (
			<Col id="calendar-month">
				{this.renderHeader()}
				{this.renderDays()}
				{this.renderCells()}
			</Col>
		);
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonth);
