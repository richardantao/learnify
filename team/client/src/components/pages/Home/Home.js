import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Nav from "../../organisms/Nav";
import Footer from "../../organisms/Footer";

import { Button } from "reactstrap";

import background from "./team-min.jpg"
import "./Home.scss";

class Home extends Component {
    state = {
    
    };

    static propTypes = {
        // error: PropTypes.object.isRequired
    };

    componentDidMount() {

    };

    // componentDidUpdate(prevProps) {
    //     const { error } = this.props;

    //     if(error !== prevProps.error) {
    //         if(error.id === "LOGIN_FAILED") {
    //             this.setState({
    //                 message: error.message.message
    //             });
    //         } else {
    //             this.setState({
    //                 message: null
    //             });
    //         };
    //     };
    // };

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Team</title>
                </Helmet>
                <Nav/>
                <main role="main">
                    <img src={background} class="background" alt="Learnify team lightbulb"/>
                    <div>
                        <h1>We want to improve education. So do you.<br/>Lets <b>team</b> up.</h1>
                        <Button href="/roles">Join the Team</Button>
                        <Button href="/signin">Sign In</Button>
                    </div>
                </main>        
                <Footer/>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    // error: state.error
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);