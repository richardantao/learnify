import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { logout } from "../../../actions/auth/auth";
import PropTypes from "prop-types";

import { Button, Container, Col, Row } from "reactstrap";
import { faFacebookSquare, faLinkedin, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

// Atoms
import Header from "../../atoms/Header";
import Icon from "../../atoms/Icon";

// Organisms

import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

import { } from "./Settings.module.scss";

class Settings extends Component {
	state = {
		form: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.setState({ form: <Profile/> });	
	};

	handleProfile = () => {
		this.setState({ form: <Profile/> });
	};

	handlePassword = () => {
		this.setState({ form: <Password/> });
	};

	handlePreferences = () => {
		this.setState({ form: <Preference/> });
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
				<Row id="settings">
					<Col>
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
									{form}
								</Col>		
							</Row>
						</Container>
						<Row className="footer settings-footer">
							<Col>
								<Button href="https://www.facebook.com/learnify.ca" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faFacebookSquare}/></Button>
								<Button href="https://www.linkedin.com/company/learnify" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faLinkedin}/></Button>
								<Button href="https://www.instagram.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faInstagram}/></Button>
								{/* <Button href="https://twitter.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faTwitterSquare}/></Button> */}
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