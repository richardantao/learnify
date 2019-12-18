import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import TopNav from "../../organisms/TopNav";
import SideNav from "../../organisms/SideNav";
import Footer from "../../organisms/Footer";

import { Input } from "reactstrap";

import "./Changelog.scss";


class Changelog extends Component {
    state = {
        showMajors: true,
        showMinors: true,
        showPatches: true,
        childHeight: 0
    };

    static propTypes = {

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
            <Fragment>
                <Helmet>
                    <title>Learnify | Changelog</title>
                </Helmet>
                <TopNav/>
                <SideNav siblingHeight={childHeight}/>
                <main role="main" ref={ (mainElement) => { this.mainElement = mainElement } } id="changelog">
                    <h1>Changelog</h1>
                    <header id="filters">
                        <Input type="checkbox" id="major" name="major" checked={showMajors} onChange={this.toggleMajor}/> <span>Major Versions</span>
                        <Input type="checkbox" id="minor" name="minor" checked={showMinors} onChange={this.toggleMinor}/> <span>Minor Versions</span>
                        <Input type="checkbox" id="patch" name="patch" checked={showPatches} onChange={this.togglePatch}/> <span>Patch Versions</span>
                    </header>
                    <br/>    
                    { showMajors ? (
                        <div className="major">
                            <h2>v1.0.0</h2>
                            <h5>January x, 2020</h5>
                            <p>
                                The app is live! We're kicking off our launch with a closed beta, to receive initial feedback on quality and bugs.
                                You can request an invite at <a href="https://learnify.ca/">https://learnify.ca</a>. Further updates can be expected in the near future.
                            </p>
                            <hr/>
                        </div>
                    ): null}
                    { showMinors ? (
                        <div>
                            <h2>We're starting a changelog</h2>
                            <h5>December x, 2019</h5>
                            <p>
                                Big news today, we're starting a public changelog so you're always up to date with every update, improvement, and fix that is made in Learnify.
                            </p>
                            <p>
                                Even though we're constantly working on how we can make Learnify serve you better, sometimes it may seem that not much is happening. This changelog is here to improve that very important part 
                                of communication between you and us.
                            </p>
                            <hr/>
                        </div>
                    ): null}
                </main>
                <Footer/>
            </Fragment>
        ); 
    };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Changelog);