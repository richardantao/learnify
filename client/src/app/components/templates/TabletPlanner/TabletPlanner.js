import React from "react";

import moment from "moment";

import { Row, Col, Button, Input } from "reactstrap";

import Select from "react-select";

/* Atoms */
import Header from "../../atoms/Header";
import Active from "../../atoms/Active";
import Switch from "../../atoms/Switch";

/* Organisms */
import List from "../../organisms/List";

import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

import "./TabletPlanner.scss";

export default ({
    terms, courses, tasks, assessments,
    editTask, toggleTaskCompletion, deleteTask,
    editAssessment, toggleAssessmentCompletion, deleteAssessment
}) => {
    return (
        <Col>
            <Row className="header">
                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    <Header header="Planner"/>
                    <Active 
                        options={terms.map(({ _id, title }) => {
                            return { value: _id, label: title }
                        })}
                    />
                </Col>
                <Col xs="2" sm="2" md="2" lg="2" xl="2">
                    <Switch
                        primaryRef="#current"
                        primaryText="Current"
                        secondaryRef="#past"
                        secondaryText="Past"
                        past={past}
                    />
                </Col>
                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                    <Select 
                        value={filter}
                        placeholder="Filter by Course.."
                        onChange={this.handleFilter}
                        options={courses.map(({ _id, title }) => {
                            return { value: _id, label: title }
                        })}
                    />     
                </Col>
            </Row>
            <Row>
                <List
                    id="tasks"
                    className="list"
                    header="Tasks"
                    action={<TaskNew/>}
                    data={tasks.map(({ _id, title, course, type, deadline }) => {
                        return (
                            <Row key={_id}>
                                <Col xs="5" sm="5" md="5" lg="5" xl="5">
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
                                    <p>{deadline ? moment(deadline, "MMMM Do, h:mm a"): null}</p>
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
                <List
                    id="assessments"
                    className="list"
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
                                            (moment(start, "MMMM Do, h:mm a"))
                                        : moment(start).startOf("day") !== moment(end).startOf("day") ?
                                            ( `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "MMMM Do, h:mm a")}`)
                                        : `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "h:mm a")}`}
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