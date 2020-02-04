import React from "react";
import { Helmet } from "react-helmet";

import { Button, Col, Row } from "reactstrap";

import AuthNav from "../../global/AuthNav";
import AppNav from "../../global/AppNav";
import Header from "../../global/Header";
import HelpHeader from "../HelpHeader";

import "./Help.scss";

const Help = props => {
	return (
		<>
			<Helmet>
				<meta name="description" content=""/>
				<meta name="keywords" content="Help, FAQ"/>
				<title>My Learnify | Help</title>
			</Helmet>
			<div id="beta">
				<AuthNav/>
				<AppNav />
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

export default Help;