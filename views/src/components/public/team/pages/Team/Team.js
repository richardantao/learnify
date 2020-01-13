import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import { Button } from "reactstrap";

import Loadable from "react-loadable";
import Loading from "../../../global/organisms/Loading";

import background from "./team-min.jpg"
import "../../Team.scss";

const Login = Loadable({
    loader: () => import("../../organisms/Login"),
    loading: () => <div></div>,    
    delay: 300
});

const Team = props => {
    return (
        <>
            <Helmet>
                <title>Learnify | Team</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="team" role="main">
                    <img src={background} className="team-background" type="image/jpeg" alt="Learnify team lightbulb"/>
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

export default Team;