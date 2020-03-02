import React, { Component } from "react";
import { Helmet } from "react-helmet";

/* Redux Operations */
import { connect } from "react-redux";
import { fetchClassesForDash, editClass } from "../../../../actions/app/classes";
import { fetchTasksForDash, editTask } from "../../../../actions/app/tasks";
import { fetchAssessmentsForDash, editAssessment } from "../../../../actions/app/assessments";
import PropTypes from "prop-types";

import { Row, Col } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";

import Loadable from "react-loadable";

/* --- Atoms --- */
import Button from "../../atoms/Button";
import Today from "../../atoms/Today";

/* --- Molecules --- */

/* --- Organisms --- */
import DashboardHeader from "../../organisms/DashboardHeader";
import List from "../../organisms/List";

/* --- Templates --- */
import "../../templates/DashboardTemp/dashboard-layout.scss";

import "./Dashboard.scss";
import ClassEdit from "../../reactors/ClassEdit";

class Dashboard extends Component {
	state = {

	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		class: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		fetchClassesForDash: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		fetchTasksForDash: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		fetchAssessmentsForDash: PropTypes.func.isRequired,
		editAssessment: PropTypes.func.isRequired,
	};

	componentDidMount() {		
		const { fetchClassesForDash, fetchTasksForDash, fetchAssessmentsForDash } = this.props;

		fetchClassesForDash();
		fetchTasksForDash();
		fetchAssessmentsForDash();
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		
		if(error !== prevProps.error) {
			if(error.id === "CLASSES_ERROR" || error.id === "TASKS_ERROR" || error.id === "ASSESSMENTS_ERROR") {
				this.setState({ message: error.message.message });
			} else {
				this.setState({ message: null });
			};
		};	
	};

	render() {
		const { 
			classes: { classes },
			task: { tasks },
			assessment: { assessments },
			editClass,
			editTask,
			editAssessment
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
							<DashboardHeader class="dashboard-header" heading="Today" extra={<Today/>} type="Classes" count={classes.length}/>
							<DashboardHeader class="dashboard-header" heading="Tasks" extra={<TaskNew/>} type="Tasks" count={tasks.length}/>
							<DashboardHeader class="dashboard-header" heading="Assessments" extra={null} type="Assessments" count={assessments.length}/>
						</Row>
						<Row id="dashboard-columns" className="body">
							<List 
								id="classes" 
                                class="classes-list"
								data={classes.map(({ _id, title, course, location, time }) => {
									return (
										<Row key={_id}>
											<Col>

											</Col>
											<Col>
											
											</Col>
											<Col>
												<ClassEdit onClick={editClass(_id)}/>
											</Col>
										</Row>
									);
								})}
							/>
							<List 
								id="tasks" 
                                class="tasks-list"
								data={tasks.map(({ _id, title, course, type, deadline }) => {
									return (
										<Row key={_id}>
											<Col>
											
											</Col>
											<Col>
											
											</Col>
											<Col>
												<TaskEdit onClick={editTask(_id)}/>
											</Col>
										</Row>
									);
								})}
							/>
							<List 
								id="assessments" 
                                class="assessments-list"
								data={assessments.map(({ _id, title, course, type, date }) => {
									return (
										<Row key={_id}>
											<Col>
											
											</Col>
											<Col>
											
											</Col>
											<Col>
												<AssessmentEdit onClick={editAssessment(_id)}/>
											</Col>
										</Row>
									);
								})}
							/>
						</Row>
					</div>
				</div>
			</>
		);
	};
};

const ClassEdit = Loadable({
	loader: import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: () => <div></div>,
	delay: 300
});

const TaskNew = Loadable({
	loader: import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskNew"),
	loading: () => <div></div>,
	delay: 300
});

const TaskEdit = Loadable({
	loader: import(/* webpackChunkName: "TaskEdit" */ "../../reactors/TaskEdit"),
	loading: () => <div></div>,
	delay: 300
});

const AssessmentEdit = Loadable({
	loader: import(/* webpackChunkName: "AssessmentEdit" */ "../../reactors/AssessmentEdit"),
	loading: () => <div></div>,
	delay: 300
});

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	classes: state.classes,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	fetchClassesForDash, editClass, 
	fetchTasksForDash, editTask, 
	fetchAssessmentsForDash, editAssessment
 };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);