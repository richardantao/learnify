import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { newClass, fetchClasses, editClass,  } from "../../../actions/data/classes";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Row, Col } from "reactstrap";

import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

/* Organisms */
import CalendarHeader from "../../organisms/CalendarHeader";

import { } from "./Calendar.module.scss";

class Calendar extends Component {
	state = {
		display: <CalendarWeek/>,
		message: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		newClass: PropTypes.func.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	async componentDidMount() {
		const { clearErrors } = this.props;
		await clearErrors();
	};

	componentDidUpdate(prevProps, prevState) {
		const { error } = this.props;

		if(error !== prevProps.error) {
			if(error.id === "") {

			} else {
				
			};
		};
	};

	renderMonthView = () => {
		this.setState({ display: <CalendarMonth/> });	
	};

	renderWeekView = () => {
		this.setState({ display: <CalendarWeek/> });	
	};

	renderDayView = () => {
		this.setState({ display: <CalendarDay/> });	
	};

	renderAgendaView = () => {
		this.setState({ display: <CalendarAgenda/> });	
	};

	render() {
		const { display, message } = this.state;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<title>My Learnify | Calendar</title>
				</Helmet>
				<Row id="calendar">
					<Col>
						<Row className="header">
							<CalendarHeader/> 
						</Row>
						<Row className="body">
							{display}
						</Row>
					</Col>
				</Row>
			</>
		);
	};
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

const mapDispatchToProps = { newClass, fetchClasses, editClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);