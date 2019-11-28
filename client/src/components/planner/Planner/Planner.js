import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { } from "../../../actions/views/planner.actions";
import PropTypes from "prop-types";

import {  Col, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import Nav from "../../global/Nav";
import Header from "../../global/Header";
import Tasks from "../../tasks/Tasks";
import Assessments from "../../assessments/Assessments";

import Select from "react-select";

import "./Planner.scss";

class Planner extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired
    };
    
    componentDidMount() {

    };
    
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>My Learnify | Planner</title>
                </Helmet>
                <Nav/>
                <div id="planner">
                    <Row className="header">
                        <Col>
                            <Header header="Planner"/>
                        </Col>
                        <Col>
                            <Select placeholder="Filter by Course..">
								{/* {courseOptions} */}
							</Select>
                        </Col>
                        <Col>
                            <Button onClick={this.fetchTasks} className="current">Current</Button>
							<Button onClick={this.fetchPastTasks} className="past">Past</Button>
                        </Col>
                    </Row>
                    <Row className="body tasks-body"> 
                        <Col>
                            <h2>Tasks</h2>
                            <Button onClick={this.newTaskModal}><FontAwesomeIcon icon={faPlus}/> New Task</Button>
                        </Col>
                        <Col>
                            <h2>Assessments</h2>
                            <Button onClick={this.newTaskModal}><FontAwesomeIcon icon={faPlus}/> New Assessment</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Tasks/>
                        <Assessments/>
                    </Row>
                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Planner);