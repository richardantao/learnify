import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import Header from "../../atoms/Header";
import HelpHeader from "../../organisms/help/HelpHeader";

import "./Help.scss";

class Help extends Component {
	state = {

	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
	};

	render() {
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

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Help);