import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";

/* --- Atoms --- */
import Button from "../../atoms/Button";
import Data from "../../atoms/Data";
import Hx from "../../atoms/Hx";
import Today from "../../atoms/Today";

/* --- Molecules --- */

/* --- Organisms --- */
import DashboardHeader from "../../organisms/DashboardHeader";
import List from "../../organisms/List";
import Modal from "../../organisms/Modal";

/* --- Templates --- */
import "../../templates/DashboardTemp/dashboard-layout.scss";

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
		// const { fetchClasses, fetchTasks, fetchAssessments } = this.props;
		
		// fetchClasses();
		// fetchTasks();
		// fetchAssessments();
	};

	classModal = () => {
		const { editClass } = this.props;
		
		editClass();
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
	
		return (
			<>
				<Helmet>
					<meta name="description" content="User's My Learnify Dashboard."/>
					<meta name="keywords" content="dashboard, Learnify, classes, today, tasks, assessments, overdue"/>
					<title>My Learnify | Dashboard</title>
				</Helmet>
				<div id="beta">
					<AuthNav/>
					<AppNav/>
					<div id="dashboard">
						<Row>
							{/* <DashboardHeader classCount={classes.length} taskCount={tasks.length} assessmentCount={assessments.length}/> */}
							<DashboardHeader class="dashboard-header" heading="Today" extra={<Today/>} type="Classes" count={classes.length}/>
							<DashboardHeader class="dashboard-header" heading="Tasks" extra={<Modal/>} type="Tasks" count={tasks.length}/>
							<DashboardHeader class="dashboard-header" heading="Assessments" type="Assessments" count={assessments.length}/>
						</Row>
						<Row id="dashboard-columns" className="body">
							<List 
								id="classes" 
								data={classes.map(({ _id }) => (
									<Row key={_id} class="class-record">
										{/* <Col>
											<h5>{module}</h5>				
											<h6>{course}</h6>
										</Col>
										<Col>
											<p>{time}</p>
											<p>{location}</p>
										</Col>
										<Col>
											<Button onClick={this.classModal}><FontAwesomeIcon icon={faEdit}/></Button>
										</Col> */}
									</Row>
								))}
							/>
							<List 
								id="tasks" 
								data={tasks.map(({ _id, title, course, type, deadline }) => (
									<Row key={_id} className="task-record">
										{/* <Col>
											<h5>{title}</h5>
											<h6>{course}</h6>
										</Col>
										<Col>
											<p>{type}</p>
											<p>{deadline}</p>
										</Col>
										<Col>
											<Button onClick={this.editTaskModal}><FontAwesomeIcon icon={faEdit}/></Button>
										</Col> */}
									</Row>
								))}
							/>
							<List 
								id="assessments" 
								data={assessments.map(({ _id, title, course, date, time, location}) => (
									<Row key={_id} className="assessment-record">
										{/* <Col>
											<h5>{title}</h5>
											<h6>{course}</h6>			
										</Col>
										<Col>
											<p>{date}</p>
											<p>{time}</p>
											<p>{location}</p>
										</Col>
										<Col>
											<Button onClick={this.assessmentModal}><FontAwesomeIcon icon={faEdit}/></Button>
										</Col> */}
									</Row>
								))}
							/>
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