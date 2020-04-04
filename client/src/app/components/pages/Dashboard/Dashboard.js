import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { isMobile, isTablet } from "react-device-detect"; 

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

import { Row } from "reactstrap";

import Loadable from "react-loadable";

import "./Dashboard.scss"; // distribute to templates

class Dashboard extends Component {
	state = {
		activeTerm: null
	};

	static propTypes = {
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
			meta,
			error,
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
					{ isMobile ? 
						<MobileDashboard
							meta={meta}
							error={error}
							classes={classes}
							tasks={tasks}
							assessments={assessments}
							editClass={editClass}
							toggleTaskCompletion={toggleTaskCompletion}
							deleteClass={deleteClass}
							editTask={editTask}
							deleteTask={deleteTask}
							editAssessment={editAssessment}
							toggleAssessmentCompletion={toggleAssessmentCompletion}
							deleteAssessment={deleteAssessment}
						/>
					: isTablet ? 
						<TabletDashboard
							meta={meta}
							error={error}
							classes={classes}
							tasks={tasks}
							assessments={assessments}
							editClass={editClass}
							toggleTaskCompletion={toggleTaskCompletion}
							deleteClass={deleteClass}
							editTask={editTask}
							deleteTask={deleteTask}
							editAssessment={editAssessment}
							toggleAssessmentCompletion={toggleAssessmentCompletion}
							deleteAssessment={deleteAssessment}
						/>
					: 	<DesktopDashboard
							meta={meta}
							error={error}
							classes={classes}
							tasks={tasks}
							assessments={assessments}
							editClass={editClass}
							deleteClass={deleteClass}
							editTask={editTask}
							toggleTaskCompletion={toggleTaskCompletion}
							deleteTask={deleteTask}
							editAssessment={editAssessment}
							toggleAssessmentCompletion={toggleAssessmentCompletion}
							deleteAssessment={deleteAssessment}
						/> 
					}
				</Row>
			</>
		);
	};
};

const DesktopDashboard = Loadable({
	loader: () => import(/* webpackChunkName: "DesktopDashboard" */ "../../templates/DesktopDashboard"),
	loading: () => <div></div>,
	delay: 300
});

const MobileDashboard = Loadable({
	loader: () => import(/* webpackChunkName: "MobileDashboard" */ "../../templates/MobileDashboard"),
	loading: () => <div></div>,
	delay: 300
});

const TabletDashboard = Loadable({
	loader: () => import(/* webpackChunkName: "TabletDashboard" */ "../../templates/TabletDashboard"),
	loading: () => <div></div>,
	delay: 300
});

const mapStateToProps = state => ({
	meta: state.meta,
	error: state.error,
	classes: state.classes,
	task: state.task,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	setActiveTerm,
	fetchClasses, editClass, updateClass, deleteClass,
	fetchTasks, editTask, toggleTaskCompletion, deleteTask,
	fetchAssessments, editAssessment, toggleAssessmentCompletion, deleteAssessment
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);