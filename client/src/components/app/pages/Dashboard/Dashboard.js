import React, { Component } from "react";
import { Helmet } from "react-helmet";

/* Redux Operations */
import { connect } from "react-redux";
import { 
	fetchClassesForDash, editClass, updateClass, deleteClass 
} from "../../../../actions/beta/classes";
import { 
	createTask, fetchTasksForDash, editTask, updateTask, deleteTask 
} from "../../../../actions/beta/tasks";
import { 
	fetchAssessmentsForDash, editAssessment, updateAssessment, deleteAssessment 
} from "../../../../actions/beta/assessments";
import PropTypes from "prop-types";

import { Row } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";

import { Modal } from "reactstrap";

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

class Dashboard extends Component {
	state = {

	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		class: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		fetchClassesForDash: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		updateClass: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		createTask: PropTypes.func.isRequired,
		fetchTasksForDash: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		fetchAssessmentsForDash: PropTypes.func.isRequired,
		editAssessment: PropTypes.func.isRequired,
		updateAssessment: PropTypes.func.isRequired,
		deleteAssessment: PropTypes.func.isRequired
	};

	componentDidMount() {		
		this.readItems();
	};

	readItems = termId => {
		const { fetchClassesForDash, fetchTasksForDash, fetchAssessmentsForDash } = this.props;

		fetchClassesForDash(termId);
		fetchTasksForDash(termId);
		fetchAssessmentsForDash(termId);
	};

	render() {
		const { 
			classes: { classes },
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
							<DashboardHeader class="dashboard-header" heading="Today" extra={<Today/>} type="Classes" count={classes.length}/>
							{/* <DashboardHeader class="dashboard-header" heading="Tasks" extra={<Modal/>} type="Tasks" count={tasks.length}/> */}
							<DashboardHeader class="dashboard-header" heading="Assessments" extra={null} type="Assessments" count={assessments.length}/>
						</Row>
						<Row id="dashboard-columns" className="body">
							<List 
								id="classes" 
                                class="classes-list"
								// data={classes.map(({ _id, title, course, location, time }) => (
									
								// ))}
							/>
							<List 
								id="tasks" 
                                class="tasks-list"
								// data={tasks.map(({ _id, title, course, type, deadline }) => (
									
								// ))}
							/>
							<List 
								id="assessments" 
                                class="assessments-list"
								// data={assessments.map(({ _id, title, course, type, date }) => (
									
								// ))}
							/>
						</Row>
					</div>
				</div>
			</>
		);
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	classes: state.classes,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	fetchClassesForDash, editClass, updateClass, deleteClass,
	createTask, fetchTasksForDash, editTask, updateTask, deleteTask,
	fetchAssessmentsForDash, editAssessment, updateAssessment, deleteAssessment
 };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);