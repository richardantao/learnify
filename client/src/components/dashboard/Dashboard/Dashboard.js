import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchDashItems } from "../../../actions/views/dashboard.action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import Nav from "../../global/Nav";
import DashboardHeader from "../DashboardHeader";

import "./Dashboard.scss";

class Dashboard extends Component {
	state = {

	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		class: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired//,
		// fetchDashItems: PropTypes.func.isRequired
	};

	componentDidMount() {
		// this.props.fetchClasses();
		// this.props.fetchTasks();
		// this.props.fetchAssessments();
	};

	classModal = () => {
		this.props.editClass();
	};

	editTaskModal = () => {

		this.props.editTask();
	};

	newTaskModal = () => {	

	};

	assessmentModal = () => {
		
	};

	render() {
		const { classes } = this.props.class;
		const { tasks } = this.props.task;
		const { assessments } = this.props.assessment;

		// const classRecords = classes.map(({ _id, module, course, time, location }) => (
		// 	<Row key={_id} class="class-record">
		// 		<Col>
		// 			<h5>{module}</h5>				
		// 			<h6>{course}</h6>
		// 		</Col>
		// 		<Col>
		// 			<p>{time}</p>
		// 			<p>{location}</p>
		// 		</Col>
		// 		<Col>
		// 			<Button onClick={this.classModal}><FontAwesomeIcon icon={faEdit}/></Button>
		// 		</Col>
		// 	</Row>
		// ));

		// const taskRecords = tasks.map(({ _id, title, course, type, deadline }) => (
		// 	<Row key={_id} className="task-record">
		// 		<Col>
		// 			<h5>{title}</h5>
		// 			<h6>{course}</h6>
		// 		</Col>
		// 		<Col>
		// 			<p>{type}</p>
		// 			<p>{deadline}</p>
		// 		</Col>
		// 		<Col>
		// 			<Button onClick={this.editTaskModal}><FontAwesomeIcon icon={faEdit}/></Button>
		// 		</Col>
		// 	</Row>
		// ));

		// const assessmentRecords = assessments.map(({ _id, title, course, date, time, location}) => (
		// 	<Row key={_id} className="ass-record">
		// 		<Col>
		// 			<h5>{title}</h5>
		// 			<h6>{course}</h6>			
		// 		</Col>
		// 		<Col>
		// 			<p>{date}</p>
		// 			<p>{time}</p>
		// 			<p>{location}</p>
		// 		</Col>
		// 		<Col>
		// 			<Button onClick={this.assessmentModal}><FontAwesomeIcon icon={faEdit}/></Button>
		// 		</Col>
		// 	</Row>
		// ));

		return (
			<Fragment>
				<Helmet>
					<title>My Learnify | Dashboard</title>
				</Helmet>
				<Nav/>
				<div id="dashboard">
					<Row>
						<DashboardHeader/>
					</Row>
					<Row id="dashboard-columns" className="body">
						<Col id="classes-column">
							{/* {classRecords} */}
						</Col>
						<Col id="tasks-column">
							{/* {taskRecords} */}
						</Col>
						<Col id="ass-column">
							{/* {assessmentRecords} */}
						</Col>
					</Row>
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

const mapDispatchToProps = { fetchDashItems };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);