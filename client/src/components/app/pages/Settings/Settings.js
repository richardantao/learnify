import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { logout } from "../../../../actions/auth/auth";
import PropTypes from "prop-types";

import { Button, Container, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLinkedin, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

// Atoms
import Header from "../../atoms/Header";

// Organisms
import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Settings.scss";

class Settings extends Component {
	state = {
		form: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
	};

	async componentDidMount() {
		this.setState({ form: "profile" });
	};

	handleProfile = () => {
		this.setState({ form: "profile" });
	};

	handlePassword = () => {
		this.setState({ form: "password" });
	};

	handlePreferences = () => {
		this.setState({ form: "preferences" });
	};

	handleLogout = () => {

		const { logout } = this.props;
		
		// logout user
		logout();
	};

	render() {
		const { form } = this.state;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<meta name="keywords" content=""/>
					<title>My Learnify | Settings</title>
				</Helmet>
				<Row id="beta">
					<Col
						xs="1"
						sm="1"
						md="1"
						lg="1"
						xl="1"
					>				
						<AppNav/>
					</Col>
					<Col 
						id="settings"
						xs="11"
						sm="11"
						md="11"
						lg="11"
						xl="11"
					>
						<AuthNav/>
						<Row className="header">
							<Col>
								<Header header="Settings"/> 
							</Col>
							<Col>
								<Button onClick={this.handleLogout}>Sign Out</Button>
							</Col>
						</Row>
						<Row>
							<Col className="settings-nav">
								<Button onClick={this.handleProfile} block>Profile</Button>
								<Button onClick={this.handlePassword} block>Password</Button>	
								<Button onClick={this.handlePreferences} block>Preferences</Button>
							</Col>
						</Row>
						<Container>
							<Row className="body settings-body">
								<Col>
									{ form === "profile" ? (
										<Profile/>
									): null }
									{ form === "password" ? (
										<Password/>
									): null }
									{ form === "preferences" ? (
										<Preference/>
									): null }
								</Col>		
							</Row>
						</Container>
						<Row className="footer settings-footer">
							<Col>
								<Button href="https://www.facebook.com/learnify.ca" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faFacebookSquare}/></Button>
								<Button href="https://www.linkedin.com/company/learnify" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faLinkedin}/></Button>
								<Button href="https://www.instagram.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faInstagram}/></Button>
								{/* <Button href="https://twitter.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faTwitterSquare}/></Button> */}
							</Col>
							<Col>
								<p>Copyright {year} Learnify. All rights reserved. </p>
									<a href="/docs/changelog" target="_blank" rel="noopener noreferrer">{version}</a>
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	};
};

const Profile = Loadable({
	loader: () => import(/* webpackChunkName: "Profile" */ "../../reactors/Profile"),
	loading: Loading,
	delay: 300
});

const Password = Loadable({
	loader: () => import(/* webpackChunkName: "Password" */ "../../reactors/Password"),
	loading: Loading,
	delay: 300
});

const Preference = Loadable({
	loader: () => import(/* webpackChunkName: "Preference" */ "../../reactors/Preferences"),
	loading: Loading,
	delay: 300
});

const year = new Date().getFullYear();
const version = "Version 1.0.0-beta";

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);