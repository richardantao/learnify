import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";

import Login from "../../organisms/Login";
import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import { Button } from "reactstrap";

import background from "./team-min.jpg"
import "../../Team.scss";

class Team extends Component {
    state = {
    
    };

    componentDidMount() {

    };

    render() {
        return (
            <>
                <Helmet>
                    <title>Learnify | Team</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <main className="team" role="main">
                        <img src={background} className="team-background" alt="Learnify team lightbulb"/>
                        <div class="team-pitch">
                            <h1>We want to <b>change</b> education for all.<br/> You do too, so lets <b>team</b> up.</h1>
                            <div className="team-pitch-links">
                                <Button href="team/roles">Join the Team</Button>
                                <Login/>
                            </div>
                        </div>
                    </main>        
                    <Footer/>
                </div>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // error: state.error
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Team);