import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../../public/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../public/organisms/Footer";

import "./Docs.scss";

export default class Docs extends Component {
    state = {
        childHeight: 0
    };

    componentDidMount() {
        const childHeight = this.mainElement.clientHeight;

        this.setState({
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

    render() {
        const { childHeight } = this.state;

        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Docs</title>
                </Helmet>
                <Header/>
                <SideNav siblingHeight={childHeight}/>
                <main role="main" ref={ (mainElement) => { this.mainElement = mainElement } }>
                    <div id="what">
                        <h1>What is Learnify?</h1>
                        <p>
                            Learnify is your all-in-one study tool, helping you stay on top of your classes, 
                            homework, assignments, meetings, exams, and more.
                        </p>
                    </div>
                    <div id="why">
                        <h2>Why use Learnify?</h2>
                        <ul>
                            <li>Organize all of your school material in a centralized location</li>
                            <li>Automate repetitive planning</li>
                            <li>Spend less time thinking and more time doing</li>
                            <li>Have your paperless school planner with you wherever you go</li>
                            <li>Share resources and insight with your local academic community</li>
                            <li>Gain insight into courses you consider taking in the future</li>
                        </ul>
                    </div>
                    <div id="basics">
                        <h3>The Basics</h3>
                        <div>
                            <h5>Dashboard</h5>
                            <p>
                                Stay on top of all important items with the Dashboard; See all the upcoming classes for the day, 
                                as well as tasks and assessments due within the week. 
                            </p>
                        </div>
                        <div>
                            <h5>Calendar</h5>
                            <p>
                                See all your events and todos in a multi-view calendar.
                            </p>
                        </div>
                        <div>
                            <h5>Academics</h5>
                            <p>
                                The Academics feature is your all-in-one course manager, allowing you to keep track of all your courses - by semester, and year. Set up repeating
                                classes that are displayed on the calendar, tabulate your courses, track your grades, and more. 
                            </p>
                        </div>
                        <div>
                            <h5>Planner</h5>
                            <p>
                                Planner allows you to keep concise tabs on your upcoming homework, assignments, and exams.
                                Set a deadline/date and Learnify will automatically organize your upcoming tasks and assessments in highest priority, to help you 
                                keep your work load focused and spaced.
                            </p>
                        </div>
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};