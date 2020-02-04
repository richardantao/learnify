import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
// import { } from "";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

import AuthNav from "../../global/AuthNav";
import AppNav from "../../global/AppNav";
import DashboardHeader from "../DashboardHeader";

import "./Dashboard.scss";

class Dashboard extends Component {
	state = {

	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		class: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired
	};

	componentDidMount() {
		const { fetchClasses, fetchTasks, fetchAssessments } = this.props;
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
		const { 
			class: { classes },
			task: { tasks },
			assessment: { assessments }
	 	} = this.props;

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
			<>
				<Helmet>
					<meta name="description" content=""/>
					<meta name="keywords" content="dashboard, Learnify"/>
					<title>My Learnify | Dashboard</title>
				</Helmet>
				<div id="beta">
					<AuthNav/>
					<AppNav/>
					<div id="dashboard">
						<Row>
							<DashboardHeader classCount={classes.length} taskCount={tasks.length} assessmentCount={assessments.length}/>
						</Row>
						<Row id="dashboard-columns" className="body">
							<Col id="classes-column">
								{/* {classRecords} */}
							</Col>
							<Col id="tasks-column">
								{/* {taskRecords} */}
							</Col>
							<Col id="assessments-column">
								{/* {assessmentRecords} */}
							</Col>
						</Row>
					</div>
				</div>
			</>
		);
	};
};

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	class: state.classes,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = {  };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);