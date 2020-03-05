import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { fetchClassesByTerm } from "../../../../actions/app/classes"; // new action function for 
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Row } from "reactstrap";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

/* Organisms */
import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import CalendarHeader from "../../organisms/CalendarHeader";

import "./Calendar.scss";

class Calendar extends Component {
	state = {
		display: "week",
		message: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		fetchClassesByTerm: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	renderMonthView = () => {
		this.setState({ display: "month" });	
	};

	renderWeekView = () => {
		this.setState({ display: "week" });	
	};

	renderDayView = () => {
		this.setState({ display: "week" });	
	};

	renderAgendaView = () => {
		this.setState({ display: "agenda" });	
	};

	render() {
		const { display, message } = this.state;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<title>My Learnify | Calendar</title>
				</Helmet>
				<div id="beta">
					<AuthNav/>
					<AppNav />
					<div id="calendar">
						<Row className="header">
							<CalendarHeader/> 
							
						</Row>
						<Row className="body">
							{ display === "month" ? (
								<CalendarMonth
									
								/>
							): null }
							{ display === "week" ? (
								<CalendarWeek
								
								/>
							): null }
							{ display === "day" ? (
								<CalendarDay
								
								/>
							): null }
							{ display === "agenda" ? (
								<CalendarAgenda
								
								/>
							): null }
						</Row>
					</div>
				</div>
			</>
		);
	}
};

const CalendarMonth = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../../organisms/CalendarMonth"),
	loading: Loading, 
	delay: 300
});

const CalendarWeek = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../../organisms/CalendarWeek"),
	loading: Loading,
	delay: 300
});

const CalendarDay = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarDay" */ "../../organisms/CalendarDay"),
	loading: Loading,
	delay: 300
});

const CalendarAgenda = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarAgenda" */ "../../organisms/CalendarAgenda"),
	loading: Loading,
	delay: 300
});

const ClassEdit = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: Loading,
	delay: 300
});

const ClassNew = Loadable({
	loader: () => import(/* webpackChunkName: "ClassNew" */ "../../reactors/ClassNew"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	classes: state.classes
});

const mapDispatchToProps = { fetchClassesByTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);