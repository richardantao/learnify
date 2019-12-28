import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import Nav from "../../global/Nav";
import Header from "../../global/Header";
import Years from "../../years/Years";
import YearEditModal from "../../years/YearEditModal";
import YearNewModal from "../../years/YearNewModal";
import Terms from "../../terms/Terms";
import TermNewModal from "../../terms/TermNewModal";
import Courses from "../../courses/Courses";
import CourseNewModal from "../../courses/CourseNewModal";
import Classes from "../../classes/Classes/Classes";
import ClassNewModal from "../../classes/ClassNewModal";

import "./Academics.scss";

class Academics extends Component {
    state = {
			
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		term: PropTypes.object.isRequired,
		course: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired
    };

    componentDidMount() {

	};
	
    render() {
		

        return (
            <>
				<Helmet>
					<title>My Learnify | Academics</title>
				</Helmet>
				<div id="beta">
					<Nav/>
					<div id="academics">
						<Row className="header">
							<Col>
								<Header header="Academics"/>
							</Col>
							<Col>
								<Years/>
								<YearEditModal/>
								<YearNewModal/>
							</Col>
						</Row>
						<Row className="body academics-body">
							<Col>
								<Row className="terms-header">
									<Col>
										<h4>Terms</h4>
									</Col>
									<Col>
										<TermNewModal/>
										<Button onClick={this}><FontAwesomeIcon icon={faEdit} /></Button>
									</Col>
								</Row>
							</Col>
							<Col>
								<Row className="courses-header">
									<Col>	
										<h4>Courses</h4>
									</Col>
									<Col>
										<CourseNewModal/>
										<Button onClick={this}><FontAwesomeIcon icon={faEdit} /></Button>
									</Col>
								</Row>
							</Col>
							<Col>
								<Row className="classes-header">
									<Col>
										<h4>Classes</h4>
									</Col>
									<Col>
										<ClassNewModal/>
										<Button onClick={this}><FontAwesomeIcon icon={faEdit} /></Button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Terms className="terms-list"/>
							<Courses className="courses-list"/>
							<Classes className="class-list"/>		
						</Row>
					</div>
				</div>
			</>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Academics);