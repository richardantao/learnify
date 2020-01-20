import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";

import Nav from "../../global/Nav";
import Header from "../../global/Header";

import "./Help.scss";

export default class Help extends Component {
	componentDidMount() {
		
	};

	componentDidUpdate(prevProps) {

	};

	render() {
		return (
			<>
				<Helmet>
					<title>My Learnify | Help</title>
				</Helmet>
				<div id="beta">
					<Nav />
					<div id="help">
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
					</div>
				</div>
			</>
		);
	};
};