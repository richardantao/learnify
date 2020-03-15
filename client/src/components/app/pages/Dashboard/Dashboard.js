import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { setActiveTerm } from "../../../../actions/app/meta";
import { fetchClasses, editClass } from "../../../../actions/app/classes";
import { fetchTasks, editTask } from "../../../../actions/app/tasks";
import { fetchAssessments, editAssessment } from "../../../../actions/app/assessments";
import PropTypes from "prop-types";

import { Row, Col, Button } from "reactstrap";

import Loadable from "react-loadable";

/* --- Atoms --- */
import Today from "../../atoms/Today";

/* --- Molecules --- */


/* --- Organisms --- */
import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import DashboardHeader from "../../organisms/DashboardHeader";
import List from "../../organisms/List";

/* --- Templates --- */
import "../../templates/DashboardTemp/dashboard-layout.scss";

import "./Dashboard.scss";

class Dashboard extends Component {
	state = {
		activeTerm: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		meta: PropTypes.object.isRequired,
		error: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		setActiveTerm: PropTypes.func.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		fetchTasks: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		fetchAssessments: PropTypes.func.isRequired,
		editAssessment: PropTypes.func.isRequired,
	};

	async componentDidMount() {		
		const { setActiveTerm } = this.props;
		await setActiveTerm();
	};

	componentDidUpdate(prevProps) {
		const { error, 
			meta: { activeTerm }, 
			fetchClasses,
			fetchTasks, 
			fetchAssessments 
		} = this.props;
		
		if(error !== prevProps.error) {
			if(error.id === "CLASSES_ERROR" || error.id === "TASKS_ERROR" || error.id === "ASSESSMENTS_ERROR") {
				this.setState({ message: error.message.message });
			} else {
				this.setState({ message: null });
			};
		};	

		if(activeTerm !== prevProps.meta.activeTerm) {
			this.setState({ activeTerm });

			fetchClasses("terms", activeTerm._id, "limit=true");
			fetchTasks("terms", activeTerm._id, "limit=true");
			fetchAssessments("terms", activeTerm._id, "limit=true");
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
				<Row id="beta">
					<Col
						xs="1"
						sm="1"
						md="1"
						lg="1"
						xl="1"
					>
						<AppNav/>
					</Col>
					<Col 
						id="dashboard"
						xs="11"
						sm="11"
						md="11"
						lg="11"
						xl="11"
					>
						<AuthNav/>
						<Row>
							<DashboardHeader class="dashboard-header" heading="Today" extra={<Today/>} type="Classes" count={classes.length}/>
							<DashboardHeader class="dashboard-header" heading="Tasks" extra={<TaskNew/>} type="Tasks" count={tasks.length}/>
							<DashboardHeader class="dashboard-header" heading="Assessments" extra={null} type="Assessments" count={assessments.length}/>
						</Row>
						<Row id="dashboard-columns" className="body">
							<List 
								id="classes" 
                                className="classes-list"
								data={classes.map(({ _id, title, course, location, date: { start, end } }) => {
									return (
										<Row key={_id}>
											<Col>
												<h4>{title}</h4>
												<h5>{course.title}</h5>
											</Col>
											<Col>
												<p>{location}</p>
												<p>
													{ moment(start).startOf("day") - moment(start) < 60*60*12 && moment(end).startOf("day") - moment(end) > 60*60*12 ? (
														`${moment(start, "h:mm a")} - ${moment(end, "h:mm a")}`
													): `${moment(start, "h:mm")} - ${moment(end, "h:mm a")}` }
												</p>
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
                                className="tasks-list"
								data={tasks.map(({ _id, title, course, type, deadline }) => {
									return (
										<Row key={_id}>
											<Col>
												<h4>{title}</h4>
												<h5>{course.title}</h5>
											</Col>
											<Col>
												<p>{type}</p>
												<p>{moment(deadline, "MMMM Do, h:mm a")}</p>
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
                                className="assessments-list"
								data={assessments.map(({ _id, title, course, type, date: { start, end } }) => {
									return (
										<Row key={_id}>
											<Col>
												<h4>{title}</h4>
												<h5>{course.title}</h5>
											</Col>
											<Col>
												<p>{type}</p>
												<p>
													{ !end ?
                                                        (moment(start, "MMMM Do, h:mm a"))
                                                    : moment(start).startOf("day") !== moment(end).startOf("day") ?
                                                        ( `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "MMMM Do, h:mm a")}`)
                                                    : `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "h:mm a")}`
													}
												</p>
											</Col>
											<Col>
												<AssessmentEdit onClick={editAssessment(_id)}/>
											</Col>
										</Row>
									);
								})}
							/>
						</Row>
					</Col>
				</Row>
			</>
		);
	};
};

const ClassEdit = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: () => <div></div>,
	delay: 300
});

const TaskNew = Loadable({
	loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskNew"),
	loading: () => <div></div>,
	delay: 300
});

const TaskEdit = Loadable({
	loader: () => import(/* webpackChunkName: "TaskEdit" */ "../../reactors/TaskEdit"),
	loading: () => <div></div>,
	delay: 300
});

const AssessmentEdit = Loadable({
	loader: () => import(/* webpackChunkName: "AssessmentEdit" */ "../../reactors/AssessmentEdit"),
	loading: () => <div></div>,
	delay: 300
});

const mapStateToProps = state => ({
	meta: state.meta,
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	classes: state.classes,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	setActiveTerm,
	fetchClasses, editClass, 
	fetchTasks, editTask, 
	fetchAssessments, editAssessment
 };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);