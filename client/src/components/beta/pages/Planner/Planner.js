import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Col, Row, Button } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import Header from "../../organisms/Header";
import Tasks from "../../tasks/Tasks";
import Assessments from "../../assessments/Assessments";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Planner.scss";

class Planner extends Component {
    state = {

    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool
        error: PropTypes.object.isRequired
    };

    render() {
        const { } = this.props;

        const courseOptions = {  };
        
        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content="Learnify, Planner, Tasks, Assessments"/>
                    <title>My Learnify | Planner</title>
                </Helmet>
                <div id="beta">
                    <AuthNav/>
                    <AppNav/>
                    <div id="planner">
                        <Row className="header">
                            <Col>
                                <Header header="Planner"/>
                            </Col>
                            <Col>
                                {/* <Select placeholder="Filter by Course.."> */}
                                    {/* {courseOptions} */}
                                {/* </Select> */}
                            </Col>
                            <Col>
                                <Button onClick={this.handleCurrentItems} className="current">Current</Button>
                                <Button onClick={this.handlePastItems} className="past">Past</Button>
                            </Col>
                        </Row>
                        <Row className="body tasks-body"> 
                            <Col>
                                <h2>Tasks</h2>
                                <TaskNewModal/>
                            </Col>
                            <Col>
                                <h2>Assessments</h2>
                                <AssessmentNewModal/>
                            </Col>
                        </Row>
                        <Row>
                            <Tasks/>
                            <Assessments/>
                        </Row>
                    </div>
                </div>
            </>
        );
    };
};

const TaskNewModal = Loadable({
    loader: () => import(/* webpackChunkName: "TaskNewModal" */ "../../tasks/TaskNewModal"),
    loading: () => <Loading/>,
    delay: 300
});

const AssessmentNewModal = Loadable({
    loader: () => import(/* webpackChunkName: "AssessmentNewModal" */ "../../assessments/AssessmentNewModal"),
    loading: () => <Loading/>,
    delay: 300
});

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

const mapDispatchToProps = { };

export default connect (mapStateToProps, mapDispatchToProps)(Planner);