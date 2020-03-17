import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Blog.scss";

export default ({  }) => {
    return (
        <>
            <Helmet>
                <meta name="description" content="In this blog post we discuss the importance of..."/>
                <meta name="keywords" content="Learnify, blog, post, calling, Jeff Bezos, career, job"/>
                <link rel="canonical" href="https://learnify.ca/blog/calling"/>
                <title>Learnify Blog</title>
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