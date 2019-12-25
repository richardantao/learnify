import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../../public/organisms/Header";
import Footer from "../../../public/organisms/Footer";
import Card from "../../../public/templates/Card";

import calling from "../Calling/calling-min.jpg"
import change from "../Change/change-min.jpg";
import danger from "../Danger/danger-min.jpg";
import emerging from "../Emerging/emerging-min.jpg";
import habits from "../Habits/habits-min.jpg";
import history from "../History/history-min.jpg";
import mission from "../Mission/mission-min.jpg";
import pareto from "../Pareto/pareto-min.jpg";
import tips from "../Tips/tips-min.jpg";
import "./Blog.scss";

export default class Blog extends Component {
    state={

    };

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Blog</title>
                </Helmet>
                <Header/>
                <main role="main">
                    <h1>Blog</h1>
                    <div id="pitch">
                        At Learnify, we're crazy about helping students achieve their very best. We use this blog to collect our insights, ideas, and achievements.
                    </div>
                    <div id="posts">
                        <Card
                            src={calling}
                            alt="Don't Find a Career, Find a Calling"
                            href="/blogs/calling"
                            title="Don't Find a Career, Find a Calling"
                            date="Coming Soon"
                            text="Jeff Bezos: You can have a job or a career, but if you have this you've 'hit the jackpot'."
                        />
                        <Card
                            src={danger}
                            alt="Danger of Choosing Your Child's Career For Them"
                            href="/blog/danger"
                            title="The Dangers of Choosing Your Child's Career For Them"
                            date="Coming Soon"
                            text="We all think we know what's best for our kids. But at what point do our own wants deter them from 
                                reaching their full potential?"
                        />
                        <Card
                            src={pareto}
                            alt="Pareto's Principle"
                            href="/blog/pareto"
                            title="How to Get More From Doing Less"
                            date="Coming Soon"
                            text="Most things in life are not distributed evenly. The same goes for the results that come from your efforts. 
                            Here's how you can make the most from your time."
                        />
                        <Card
                            src={habits}
                            alt="Habits Students Need"
                            href="/blog/habits"
                            title="10 Habits All Students Should Adopt"
                            date="Coming Soon"
                            text="It doesn't matter what domain you are pursuing excellence in &ndash; you won't be successful if you don't adopt
                                a disciplined routine. Here are 10 habits that are essential for academic excellence."
                        />
                        <Card
                            src={emerging}
                            alt="Emerging Ed. Tech You Should Be Aware Of"
                            href="/blog/emerging"
                            title="Emerging Ed. Tech You Should Be Aware Of"
                            date="Coming Soon"
                            text=""
                        />
                        <Card
                            src={tips}
                            alt=""
                            href="/blog/tips"
                            title="X Tips for Better Organization"
                            date="Coming Soon"
                            text="Where the Foundation Lies."
                        />
                        <Card
                            src={change}
                            alt=""
                            href="/blog/change"
                            title="Why Change is Necessary"
                            date="Coming Soon"
                            text="The world we live in is changing faster than ever, and it's not going to slow down anytime soon.
                                Finance, medicine, technology, transportation, and commerce have all dramatically evolved over the past 40 years - 
                                so why hasn't education?"
                        />
                        <Card
                            src={history}
                            alt="History of School"
                            href="/blog/history"
                            title="A Brief History of School"
                            date="Coming Soon"
                            text="We want to change the student experience. To do so, it's important to understand when institutional education 
                                started, what it was designed for, and how things have changed since."
                        />
                        <Card
                            src={mission}
                            alt="Learnify Mission"
                            href="/blog/mission"
                            title="Our Mission"
                            date="Coming Soon"
                            text="What drives us forward at Learnify."
                        />
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};