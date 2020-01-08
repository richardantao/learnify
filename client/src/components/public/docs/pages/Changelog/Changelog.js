import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import { Input } from "reactstrap";

import "../../Docs.scss";

class Changelog extends Component {
    state = {
        showMajors: true,
        showMinors: true,
        showPatches: true,
        childHeight: 0
    };

    componentDidMount() {
        const childHeight = this.mainElement.clientHeight;

        this.setState({
            showMajors: true,
            showMinors: true,
            showPatches: true,
            childHeight
        });
    };

    componentDidUpdate(prevProps, prevState) {
        // const { childHeight } = this.state;
        // if(childHeight !== prevState.childHeight) {

        // };

        setTimeout(() => {
            const childHeight = this.mainElement.clientHeight;

            this.setState({
                childHeight
            });
        }, 1000);
    };

    toggleMajor = () => {
        const { showMajors } = this.state;

        this.setState({
            showMajors: !showMajors
        });
    };

    toggleMinor = () => {
        const { showMinors } = this.state;

        this.setState({
            showMinors: !showMinors
        });
    };

    togglePatch = () => {
        const { showPatches } = this.state;

        this.setState({
            showPatches: !showPatches
        });
    };

    render() {
        const { showMajors, showMinors, showPatches, childHeight } = this.state;

        return(
            <>
                <Helmet>
                    <title>Learnify | Changelog</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav siblingHeight={childHeight}/>
                    <main id="changelog" className="docs" role="main" ref={ (mainElement) => { this.mainElement = mainElement } } >
                        <h1>Changelog</h1>
                        <header id="filters">
                            <div>
                                <Input type="checkbox" id="patch" name="patch" checked={showPatches} onChange={this.togglePatch}/> <span>Patch Versions</span>
                            </div>
                            <div>
                                <Input type="checkbox" id="minor" name="minor" checked={showMinors} onChange={this.toggleMinor}/> <span>Minor Versions</span>   
                            </div>
                            <div>
                                <Input type="checkbox" id="major" name="major" checked={showMajors} onChange={this.toggleMajor}/> <span>Major Versions</span>    
                            </div>
                        </header>
                        <br/>
                        {/* { showMinors ? (
                            <div className="minor">
                                <h2>v1.1.0-beta</h2>
                                <h5>Unreleased</h5>
                                <p>
                                    This release will focus on performance optimization and reflecting on the feedback 
                                    received from our first beta test sprint. We'll also be working away on our 
                                    first post&ndash;launch feature. Stay tuned for updates.
                                </p>
                                <hr/>
                            </div>
                        ): null }     */}
                        {/* { showMajors ? (
                            <div className="major">
                                <h2>v1.0.0-beta</h2>
                                <h5>January 31, 2020</h5>
                                <p>
                                    The app is live! We're kicking off our launch with a closed beta, 
                                    to receive initial feedback on quality and bugs. 
                                    You can request an invite at <a href="/">https://learnify.ca</a>. 
                                </p>
                                <hr/>
                            </div>
                        ): null} */}
                        { showMinors ? (
                            <div className="minor">
                                <h2>We're starting a changelog</h2>
                                <h5>January 8, 2020</h5>
                                <p>
                                    Big news today, we're starting a public changelog so you're always up 
                                    to date with every update, improvement, and fix that is made in Learnify.
                                </p>
                                <p>
                                    Even though we're constantly working on how we can make Learnify serve you better, 
                                    sometimes it may seem that not much is happening. This changelog is here to improve 
                                    that very important part of communication between you and us.
                                </p>
                                <hr/>
                            </div>
                        ): null}
                        { showMajors ? (
                            <div className="major">
                                <h2>v0.1.0</h2>
                                <h5>January 1, 2019</h5>
                                <p>
                                    Initial development.
                                </p>
                            </div>
                        ): null }
                    </main>
                    <Footer/>
                </div>
            </>
        ); 
    };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Changelog);