import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Alert, Button, Col, Row } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import Header from "../../atoms/Header";
import HelpHeader from "../../organisms/help/HelpHeader";

import Loadable from "react-loadable";

import "./Help.scss";

class Help extends Component {
	state = {
		message: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		clearErrors: PropTypes.func.isRequired
	};

	render() {
		const { } = this.state;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<meta name="keywords" content="Help, FAQ"/>
					<title>My Learnify | Help</title>
				</Helmet>
				<Row id="beta">
					<Col 
						xs="2"
						sm="2"
						md="1"
						lg="1"
						xl="1"	
					>
						<AppNav />
					</Col>
					<Col 
						id="help"
						xs="10"
						sm="10"
						md="11"
						lg="11"
						xl="11"
					>
						<AuthNav/>
						<Row className="header">
							<Col>
								<Header header="Help"/> 
							</Col>
							<Col>
								
							</Col>
						</Row>
						<Row className="body">
							<Col>
								<div>
									<h2>Frequently Asked Questions</h2>
									
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	};
};

const BugSubmit = Loadable({
	loader: () => import(/* webpackChunkName: "BugSubmit" */ "../../reactors/BugSubmit"),
	loading: () => <div></div>,
	delay: 300
});

const FeedbackSubmit = Loadable({
	loader: () => import(/* webpackChunkName: "FeedbackSubmit" */ "../../reactors/FeedbackSubmit"),
	loading: () => <div></div>,
	delay: 300
})

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Help);