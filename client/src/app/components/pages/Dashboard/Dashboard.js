import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { setActiveTerm } from "../../../actions/interface/meta";
import { 
	fetchClasses, editClass, updateClass, deleteClass 
} from "../../../actions/data/classes";
import { 
	fetchTasks, editTask, toggleTaskCompletion, deleteTask 
} from "../../../actions/data/tasks";
import { 
	fetchAssessments, editAssessment, toggleAssessmentCompletion, deleteAssessment 
} from "../../../actions/data/assessments";
import PropTypes from "prop-types";

import { Row, Col, Button, Input } from "reactstrap";

import Loadable from "react-loadable";

/* --- Atoms --- */
import Today from "../../atoms/Today";

/* --- Molecules --- */


/* --- Organisms --- */
import DashboardHeader from "../../organisms/DashboardHeader";
import List from "../../organisms/List";

import "./Dashboard.scss";

class Dashboard extends Component {
	state = {
		activeTerm: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		meta: PropTypes.object,
		error: PropTypes.object,
		classes: PropTypes.object,
		task: PropTypes.object,
		assessment: PropTypes.object,
		setActiveTerm: PropTypes.func.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		toggleTaskCompletion: PropTypes.func.isRequired,
		deleteClass: PropTypes.func.isRequired,
		fetchTasks: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		fetchAssessments: PropTypes.func.isRequired,
		editAssessment: PropTypes.func.isRequired,
		toggleAssessmentCompletion: PropTypes.func.isRequired,
		deleteAssessment: PropTypes.func.isRequired
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

			fetchClasses("terms", activeTerm._id, "?limit=true");
			fetchTasks("terms", activeTerm._id, "?limit=true");
			fetchAssessments("terms", activeTerm._id, "?limit=true");
		};
	};

	render() {
		const { 
			classes: { classes },
			task: { tasks },
			assessment: { assessments },
			editClass, deleteClass,
			editTask, toggleTaskCompletion, deleteTask,
			editAssessment, toggleAssessmentCompletion, deleteAssessment
		} = this.props;

		return (
			<>
				<Helmet>
					<meta name="description" content="User's My Learnify Dashboard."/>
					<meta name="keywords" content="Dashboard, Learnify, Classes, Today, Tasks, Assessments, Overdue, Left"/>
					<title>My Learnify | Dashboard</title>
				</Helmet>
				<Row id="dashboard">
					<Col>
						<Row>
							<DashboardHeader className="dashboard-header" heading="Today" extra={<Today/>} type="Classes" count={classes.length}/>
							<DashboardHeader className="dashboard-header" heading="Tasks" extra={<TaskNew/>} type="Tasks" count={tasks.length}/>
							<DashboardHeader className="dashboard-header" heading="Assessments" extra={null} type="Assessments" count={assessments.length}/>
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
												<Button onClick={deleteClass(_id)}>
													icon
												</Button>
											</Col>
										</Row>
									);
								})}
							/>
							<List 
								id="tasks" 
                                className="tasks-list"
								data={tasks.map(({ _id, title, course, type, deadline, completed }) => {
									return (
										<Row key={_id}>
											<Col xs="1" sm="1" md="1" lg="1" xl="1">
												<Input	
													name="completed"
													type="checkbox"
													checked={completed}
													onChange={toggleTaskCompletion(_id)}
												/>
											</Col>
											<Col xs="5" sm="5" md="5" lg="5" xl="5">
												<h4>{title}</h4>
												<h5>{course.title}</h5>
											</Col>
											<Col xs="4" sm="4" md="4" lg="4" xl="4">
												<p>{type}</p>
												<p>{moment(deadline, "MMMM Do, h:mm a")}</p>
											</Col>
											<Col xs="2" sm="2" md="2" lg="2" xl="2">
												<TaskEdit onClick={editTask(_id)}/>
												<Button onClick={deleteTask(_id)}>
													icon
												</Button>
											</Col>
										</Row>
									);
								})}
							/>
							<List 
								id="assessments" 
                                className="assessments-list"
								data={assessments.map(({ _id, title, course, type, date: { start, end }, completed }) => {
									return (
										<Row key={_id}>
											<Col xs="1" sm="1" md="1" lg="1" xl="1">
												<Input
													name="completed"
													type="checkbox"
													checked={completed}
													onChange={toggleAssessmentCompletion(_id)}
												/>
											</Col>
											<Col xs="5" sm="5" md="5" lg="5" xl="5">
												<h4>{title}</h4>
												<h5>{course.title}</h5>
											</Col>
											<Col xs="4" sm="4" md="4" lg="4" xl="4">
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
											<Col xs="2" sm="2" md="2" lg="2" xl="2">
												<AssessmentEdit onClick={editAssessment(_id)}/>
												<Button onClick={deleteAssessment(_id)}>
													icon
												</Button>
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
	fetchClasses, editClass, updateClass, deleteClass,
	fetchTasks, editTask, updateTask, deleteTask,
	fetchAssessments, editAssessment, updateAssessment, deleteAssessment
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);