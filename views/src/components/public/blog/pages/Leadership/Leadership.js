import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Blog.scss";

const Leadership = props => {
    return (
        <>
            <Helmet>
                <meta name="description" content=""/>
                <meta name="keywords" content=""/>
                <link rel="canonical" href="https://learnify.ca/blog/leadership"/>
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

export default Leadership;