import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { fetchClasses } from "../../../../actions/beta/classes";
import { fetchTasks } from "../../../../actions/beta/tasks";
import { fetchAssessments } from "../../../../actions/beta/assessments";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Nav from "../../global/Nav";
import CalendarHeader from "../CalendarHeader";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Calendar.scss";

class Calendar extends Component {
	state = {
		display: "week"
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		class: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		fetchTasks: PropTypes.func.isRequired,
		fetchAssessments: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.fetchClasses();
		this.props.fetchTasks();
		this.props.fetchAssessments();
	};

	render() {
		const { display, editModal, newModal } = this.state;
		const { classes } = this.props.class;
		const { tasks } = this.props.task;
		const { assessments } = this.props.assessment;

		return (
			<>
				<Helmet>
					<title>My Learnify | Calendar</title>
				</Helmet>
				<div id="beta">
					<Nav />
					<div id="calendar">
						<Row className="header">
							<CalendarHeader/> 
							<Col className="header-date">
								<Button onClick="">
									<FontAwesomeIcon icon={faChevronLeft}/>
								</Button>
								<h4>{this.props.date}</h4>
								<Button onClick="">
									<FontAwesomeIcon icon={faChevronRight}/>
								</Button>
							</Col>
							<Col className="calendar-selector">
								<Button>{this.props.display}</Button>
							</Col>
						</Row>
						<Row className="body">
							{ display === "month" ? (
								<CalendarMonth/>
							): null }
							{ display === "week" ? (
								<CalendarWeek/>
							): null }
							{ display === "day" ? (
								<CalendarDay/>
							): null }
							{ display === "agenda" ? (
								<CalendarAgenda/>
							): null }
						</Row>

						{ editModal ? (
							<ClassEditModal className="modal"/>
						): null }
						{ newModal ? (
							<ClassNewModal className="modal"/>
						): null}
					</div>
				</div>
			</>
		);
	};
};

const CalendarMonth = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../CalendarMonth"),
	loading: Loading, 
	delay: 300
});

const CalendarWeek = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../CalendarWeek"),
	loading: Loading,
	delay: 300
});

const CalendarDay = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarDay" */ "../CalendarDay"),
	loading: Loading,
	delay: 300
});

const CalendarAgenda = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarAgenda" */ "../CalendarAgenda"),
	loading: Loading,
	delay: 300
});

const ClassEditModal = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEditModal" */ "../../classes/ClassEditModal"),
	loading: Loading,
	delay: 300
});

const ClassNewModal = Loadable({
	loader: () => import(/* webpackChunkName: "ClassNewModal" */ "../../classes/ClassNewModal"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	class: state.class,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	fetchClasses, 
	fetchTasks, 
	fetchAssessments
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);