import React from "react";

import { Col } from "reactstrap";

import TaskNewModal from "../../tasks/TaskNewModal";
import Counter from "../Counter";
import DateDisplay from "../Date";

import "./DashboardHeader.scss";

const DashboardHeader = ({ classCount, taskCount, assessmentCount }) => {
    return (
        <>
            <Col className="dashboard-header">
                <h3>Today</h3>
                <DateDisplay/>
                { classCount === 1 ? (
                    <Counter type="Class" count={classCount}/>
                ): 
                    <Counter type="Classes" count={classCount}/>
                }
            </Col>
            <Col className="dashboard-header">
                <h3>Tasks</h3>
                <TaskNewModal className="modal"/>
                { taskCount === 1 ? (
                    <Counter type="Task" count={taskCount}/>
                ): 
                    <Counter type="Tasks" count={taskCount}/>
                }
            </Col>
            <Col className="dashboard-header">
                <h3>Assessments</h3>
                { assessmentCount === 1 ? (
                    <Counter type="Assessment" count={assessmentCount}/>
                ): 
                    <Counter type="Assessments" count={assessmentCount}/>
                }
            </Col>
        </>
    );
};

export default DashboardHeader;
