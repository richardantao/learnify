import React from "react";

import moment from "moment";
import Moment from "react-moment";

import { Row, Col, Button, Input } from "reactstrap";

import Select from "react-select";
import Skeleton from "react-loading-skeleton";

/* Atoms */
import Active from "../../atoms/Active";
import Header from "../../atoms/Header";
import Message from "../../atoms/MessageBoard";
import Switch from "../../atoms/Switch";

/* Organisms */
import List from "../../organisms/List";

import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

import "./DesktopPlanner.scss";

export default ({
    filter, handleFilter, error,
    activeTerm,
    terms, courses, tasks, assessments,
    editTask, toggleTaskCompletion, deleteTask,
    editAssessment, toggleAssessmentCompletion, deleteAssessment
}) => {
    return (
        <Col>
            {error ? <Message header={<Skeleton />} body={error || <Skeleton count={2}/>} footer={<Skeleton />}/> : null}
            <Row className="header">
                <Col>
                    <Row>
                        <Col xs="3" sm="3" md="3" lg="3" xl="3" className="title-container">
                            <Header header="Planner"/>
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="4" xl="4">
                            <Active 
                                value={activeTerm}
                                placeholder="Select Term.."
                                noOptionsMessage="No terms"
                                options={terms.map(({ _id, title }) => {
                                    return { value: _id, label: title }
                                })}
                                className="active-select"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="filter-container">
                            <Select 
                                value={filter}
                                placeholder="Filter by Course.."
                                onChange={handleFilter}
                                // noOptionsMessage="No Terms found"
                                options={courses.map(({ _id, title }) => {
                                    return { value: _id, label: title }
                                })}
                                className="filter"
                            />   
                        </Col>
                    </Row>
                </Col>
                <Col> 
                    <Row className="white-space">
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="toggle-container">
                            <Switch
                                priRef="#current"
                                priTxt="Current"
                                secRef="#past"
                                secTxt="Past"
                                className="toggle"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="body">
                <Col id="tasks" className="list">
                    <List
                        header="Tasks"
                        action={<TaskNew/>}
                        data={tasks.map(({ _id, title, course, type, deadline }) => {
                            return (
                                <Row key={_id}>
                                    <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                        <Button onClick={toggleTaskCompletion(_id)}>
                                            change to check mark
                                        </Button>
                                    </Col>
                                    <Col xs="5" sm="5" md="5" lg="5" xl="5">
                                        <h4>{title}</h4>
                                        <h5>{course.title}</h5>
                                    </Col>
                                    <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                        <p>{type}</p>
                                        <p>{deadline ? <Moment format="MMMM Do, h:mm a">{deadline}</Moment> : null}</p>
                                    </Col>
                                    <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                        <TaskEdit onClick={editTask(_id)}/>
                                        <Button onClick={deleteTask(_id)}>
                                            pass in icon
                                        </Button>
                                    </Col>
                                </Row>
                            );
                        })}
                        empty="There are no existing tasks"
                    />
                </Col>
                <Col id="assessments" className="list">
                    <List
                        header="Assessments"
                        action={<AssessmentNew/>}
                        data={assessments.map(({ _id, title, course, type, date: { start, end }, completion }) => {
                            return (
                                <Row>
                                    <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                        <Input
                                            name="completion"
                                            type="checkbox"
                                            value={completion} // change to proper rendering
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
                                                <Moment format="MMMM Do, h:mm a">{start}</Moment>
                                            : moment(start).startOf("day") !== moment(end).startOf("day") ?
                                            `${<Moment format="MMMM Do, h:mm a">{start}</Moment>} - ${<Moment format="MMMM Do, h:mm a">{end}</Moment>}`
                                            : `${<Moment format="MMMM Do, h:mm a">{start}</Moment>} - ${<Moment format="h:mm a">{end}</Moment>}`}
                                        </p>
                                    </Col>
                                    <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                        <AssessmentEdit onClick={editAssessment(_id)}/>
                                        <Button onClick={deleteAssessment(_id)}>
                                                icons
                                        </Button>
                                    </Col>
                                </Row>
                            );
                        })}
                        empty="There are no existing assessments"
                    />
                </Col>
            </Row>
        </Col>
    );
};

const TaskNew = Loadable({
    loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskNew"),
    loading: () => <Loading/>,
    delay: 300
});

const TaskEdit = Loadable({
    loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskEdit"),
    loading: () => <Loading/>,
    delay: 300
});

const AssessmentNew = Loadable({
    loader: () => import(/* webpackChunkName: "AssessmentNew" */ "../../reactors/AssessmentNew"),
    loading: () => <Loading/>,
    delay: 300
});

const AssessmentEdit = Loadable({
    loader: () => import(/* webpackChunkName: "AssessmentEdit" */ "../../reactors/AssessmentEdit"),
    loading: () => <Loading/>,
    delay: 300
});