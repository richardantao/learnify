import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Blog.scss";

const Mission = props => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Learnify's mission statement. Why we're here and what we've set out to achieve."/>
                <meta name="keywords" content="Learnify, blog, mission, post, values, why, goal"/>
                <link rel="canonical" href="https://learnify.ca/blog/mission"/>
                <title>Learnify | Blog</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="posts" role="main">

                </main>
                <Footer/>
            </div>
        </>
    );
};

export default Mission;