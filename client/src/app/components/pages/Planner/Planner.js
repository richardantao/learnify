import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { isMobile, isTablet } from "react-device-detect"; 

import { connect } from "react-redux";
import { setActiveTerm } from "../../../actions/interface/meta";
import { fetchCourses } from "../../../actions/data/courses";
import { fetchTasks, editTask, toggleTaskCompletion, deleteTask } from "../../../actions/data/tasks";
import { fetchAssessments, editAssessment, toggleAssessmentCompletion, deleteAssessment } from "../../../actions/data/assessments";
import PropTypes from "prop-types";

import { Row } from "reactstrap";

import Loadable from "react-loadable";

class Planner extends Component {
    state = {
        activeTerm: null,
        past: false,
        filter: null,
        message: null
    };

    static propTypes = {
        meta: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        term: PropTypes.object.isRequired,
        course: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        assessment: PropTypes.object.isRequired,
        setActiveTerm: PropTypes.func.isRequired,
        fetchCourses: PropTypes.func.isRequired,
        fetchTasks: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        toggleTaskCompletion: PropTypes.func.isRequired,
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

    componentDidUpdate(prevProps, prevState) {
        const { past, filter } = this.state;
        const { 
            error, 
            meta: { activeTerm }, 
            fetchCourses,
            fetchTasks, 
            fetchAssessments 
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TASKS_ERROR" || error.id === "ASSESSMENTS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(activeTerm !== prevProps.meta.activeTerm) {
            this.setState({ activeTerm });
            
            fetchCourses(activeTerm._id);
            fetchTasks("terms", activeTerm._id, "");
            fetchAssessments("terms", activeTerm._id, "");
        };

        if(past !== prevState.past || filter !== prevState.filter) {
            if(past) {
                if(filter) {
                    fetchTasks("courses", filter, "?past=true");
                    fetchAssessments("courses", filter, "?past=true");
                } else {
                    fetchTasks("terms", activeTerm._id, "?past=true");
                    fetchAssessments("terms", activeTerm._id, "?past=true");
                };
            } else {
                if(filter) {
                    fetchTasks("courses", filter, "");
                    fetchAssessments("courses", filter, "");
                } else {
                    fetchTasks("terms", activeTerm._id, "");
                    fetchAssessments("terms", activeTerm._id, "");
                };
            };
        };
    };

    togglePast = () => {
        const { past } = this.state; 
        this.setState({ past: !past});
    };

    handleFilter = filter => {
        this.setState({ filter });
    };

    render() {
        const { filter, past, message } = this.state;
        const { 
            meta: { activeTerm },
            term: { terms },
            course: { courses },
            task: { tasks },
            assessment: { assessments },
            editTask, toggleTaskCompletion, deleteTask,
            editAssessment, toggleAssessmentCompletion, deleteAssessment
        } = this.props;
        
        return (
            <>
                <Helmet>
                    <meta name="description" content="User's Planner page."/>
                    <meta name="keywords" content="Learnify, Planner, Tasks, Assessments"/>
                    <title>My Learnify | Planner</title>
                </Helmet>
                <Row id="planner">
                    { isMobile ? 
                        <MobilePlanner
                            filter={filter}
                            past={past}
                            handleFilter={this.handleFilter}    
                            error={message}
                            activeTerm={activeTerm}
                            terms={terms}
                            courses={courses}
                            tasks={tasks}
                            assessments={assessments}
                            editTask={editTask}
                            toggleTaskCompletion={toggleTaskCompletion}
                            deleteTask={deleteTask}
                            editAssessment={editAssessment}
                            toggleAssessmentCompletion={toggleAssessmentCompletion}
                            deleteAssessment={deleteAssessment}
                        />
                    : isTablet ? 
                        <TabletPlanner
                            filter={filter}
                            past={past}
                            handleFilter={this.handleFilter}    
                            error={message}
                            activeTerm={activeTerm}
                            terms={terms}
                            courses={courses}
                            tasks={tasks}
                            assessments={assessments}
                            editTask={editTask}
                            toggleTaskCompletion={toggleTaskCompletion}
                            deleteTask={deleteTask}
                            editAssessment={editAssessment}
                            toggleAssessmentCompletion={toggleAssessmentCompletion}
                            deleteAssessment={deleteAssessment}
                        />
                    :
                        <DesktopPlanner
                            filter={filter}
                            past={past}
                            handleFilter={this.handleFilter}    
                            error={message}
                            activeTerm={activeTerm}
                            terms={terms}
                            courses={courses}
                            tasks={tasks}
                            assessments={assessments}
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

const DesktopPlanner = Loadable({
    loader: () => import(/* webpackChunkName: "DesktopPlanner" */ "../../templates/DesktopPlanner"),
    loading: () => <></>,
    delay: 300
});

const MobilePlanner = Loadable({
    loader: () => import(/* webpackChunkName: "MobilePlanner" */ "../../templates/MobilePlanner"),
    loading: () => <></>,
    delay: 300
});

const TabletPlanner = Loadable({
    loader: () => import(/* webpackChunkName: "TabletPlanner" */ "../../templates/TabletPlanner"),
    loading: () => <></>,
    delay: 300
});

const mapStateToProps = state => ({
    meta: state.meta,
    error: state.error,
    term: state.term,
    course: state.course,
    task: state.task,
    assessment: state.assessment
});

const mapDispatchToProps = { 
    setActiveTerm, 
    fetchCourses,
    fetchAssessments, editAssessment, toggleTaskCompletion, deleteAssessment, 
    fetchTasks, editTask, toggleAssessmentCompletion, deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);