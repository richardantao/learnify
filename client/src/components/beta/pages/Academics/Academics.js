import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import Header from "../../organisms/Header";
import Years from "../../years/Years";
import Terms from "../../terms/Terms";
import Courses from "../../courses/Courses";
import Classes from "../../classes/Classes/Classes";

import Loadable from "react-loadable";

import "./Academics.scss";

class Academics extends Component {
	state = {

	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired
	};

	componentDidUpdate(prevProps, prevState) {
		const { error, isAuthenticated } = this.props;

		if(error !== prevProps.error) {

		} else {
			
		};
	};

	render() {
		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<meta name="keywords" content="Learnify, Academics, Years, Terms, Semester, Course, Courses, Class, Classes"/>
					<title>My Learnify | Academics</title>
				</Helmet>
				<div id="beta">
					<AuthNav/>
					<AppNav/>
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
										<Button onClick={this}>
											<FontAwesomeIcon icon={faEdit}/>
										</Button>
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
							<Terms id="terms"/>
							<Courses id="courses"/>
							<Classes id="classes"/>		
						</Row>
					</div>
				</div>
			</>
		);
	};
};


const YearEditModal = Loadable({
	loader: import(/* webpackChunkName: "YearEditModal" */ "../../years/YearEditModal"),
	loading: () => <div></div>,
	delay: 300
});

const YearNewModal = Loadable({
	loader: import(/* webpackChunkName: "YearNewModal" */ "../../years/YearNewModal"),
	loading: () => <div></div>,
	delay: 300
});

const TermNewModal = Loadable({
	loader: import(/* webpackChunkName: "TermNewModal" */ "../../terms/TermNewModal"),
	loading: () => <div></div>,
	delay: 300
});

const CourseNewModal = Loadable({
	loader: import(/* webpackChunkName: "CourseNewModal" */ "../../courses/CourseNewModal"),
	loading: () => <div></div>,
	delay: 300
});

const ClassNewModal = Loadable({
	loader: import(/* webpackChunkName: "ClassNewModal" */ "../../classes/ClassNewModal"),
	loading: () => <div></div>,
	delay: 300
});

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Academics);