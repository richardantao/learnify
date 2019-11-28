import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import Nav from "../../global/Nav";
import Header from "../../global/Header";
import Empty from "../../global/Empty";
import Years from "../../years/Years";
import Terms from "../../terms/Terms";
import Courses from "../../courses/Courses";
import YearEditModal from "../../years/YearEditModal";
import YearNewModal from "../../years/YearNewModal";
import TermEditModal from "../../terms/TermEditModal";
import TermNewModal from "../../terms/TermNewModal";
import CourseEditModal from "../../courses/CourseEditModal";
import CourseNewModal from "../../courses/CourseNewModal";


import "./Academics.scss";

class Academics extends Component {
    state = {
		renderTerms: false,
		renderCourses: false,
		renderModules: false,

		openEditYear: false,
        openNewYear: false,
        openEditTerm: false,
        openNewTerm: false,
        openEditCourse: false,
        openNewCourse: false,
		openEditModule: false,
        openNewModule: false,		
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired
    };

    componentDidMount() {

	};
	
    render() {
		const { 
			renderTerms, renderCourses, renderModules,
			openEditYear, openNewYear,
			openEditTerm, openNewTerm,
			openEditCourse, openNewCourse,
			openEditModule, openNewModule
		} = this.state;

        return (
            <Fragment>
				<Helmet>
					<title>My Tutee | Academics</title>
				</Helmet>
				<Nav/>
				<div id="academics">
					<Row className="header">
						<Col>
							<Header header="Academics"/>
						</Col>
						<Col>
							<Years/>
							<Button onClick={this}>Manage Academics</Button>
							<Button onClick={this}><FontAwesomeIcon icon={faPlus}/> New Academic Year</Button>
						</Col>
					</Row>
					<Row className="body academics-body">
						<Col>
							<Row className="terms-header">
								<Col>
									<h4>Terms</h4>
								</Col>
								<Col>
									<Button onClick={this}><FontAwesomeIcon icon={faPlus} /></Button>
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
									<Button onClick={this}><FontAwesomeIcon icon={faPlus} /></Button>
									<Button onClick={this}><FontAwesomeIcon icon={faEdit} /></Button>
								</Col>
							</Row>
						</Col>
						<Col>
							<Row className="modules-header">
								<Col>
									<h4>Modules</h4>
								</Col>
								<Col>
									<Button onClick={this}><FontAwesomeIcon icon={faPlus} /></Button>
									<Button onClick={this}><FontAwesomeIcon icon={faEdit} /></Button>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						{ renderTerms ? (
							<Terms className="terms-list"/>
						) : (
							<Col className="terms-list">
								<Empty/>
							</Col>
						)}
						{ renderCourses ? (
							<Courses className="courses-list"/>
						) : (
							<Col className="courses-list">
								<Empty/>
							</Col>
						)}
					</Row>

					{ openEditYear ? (
						<YearEditModal className="modal"/>
					): null }
					{ openNewYear ? (
						<YearNewModal className="modal"/>
					): null }
					{ openEditTerm ? (
						<TermEditModal className="modal"/>
					): null }
					{ openNewTerm ? (
						<TermNewModal className="modal"/>
					): null }
					{ openEditCourse ? (
						<CourseEditModal className="modal"/>
					): null }
					{ openNewCourse ? (
						<CourseNewModal className="modal"/>
					): null }
				</div>
			</Fragment>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Academics);