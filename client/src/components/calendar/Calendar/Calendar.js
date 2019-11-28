import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { fetchClasses } from "../../../actions/data/classes.action";
import { fetchTasks } from "../../../actions/data/tasks.action";
import { fetchAssessments } from "../../../actions/data/assessments.action";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Nav from "../../global/Nav";
import CalendarHeader from "../CalendarHeader";
import CalendarMonth from "../CalendarMonth";
import CalendarWeek from "../CalendarWeek";
import CalendarDay from "../CalendarDay";
import CalendarAgenda from "../CalendarAgenda";
import ClassEditModal from "../../classes/ClassEditModal";
import ClassNewModal from "../../classes/ClassNewModal";

import "./Calendar.scss";

class Calendar extends Component {
	state = {
		display: "week"
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
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
			<Fragment>
				<Helmet>
					<title>My Tutee | Calendar</title>
				</Helmet>
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
			</Fragment>
		);
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	class: state.class,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = { fetchClasses, fetchTasks, fetchAssessments};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);