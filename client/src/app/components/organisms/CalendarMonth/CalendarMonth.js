import React, { Component } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { fetchClasses, editClass } from "../../../actions/data/classes";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Col } from "reactstrap";

import { } from "./CalendarMonth.module.scss";

class CalendarMonth extends Component {
	state = {
		currentMonth: moment(),
		selectedDate: moment()
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		classes: PropTypes.func.isRequired
	};
	
	async componentDidMount() {
		const { } = this.state;
		 	
	};

	componentDidUpdate(prevProps, prevState) {

	};

	populateHeader = () => {

	};

	populateDays = () => {

	};

	populateCells = () => {

	};

	handleDateClick = day => {

	};

	nextMonth = () => {

	};

	prevMonth = () => {

	};

	render() {
		const { } = this.state;

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
	error: state.error,
	classes: state.classes
});

const mapDispatchToProps = { fetchClasses, editClass, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonth);