import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import banner from "./change-min.jpg";
import "../../Blog.scss";

const Change = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content=""/>
                <meta name="keywords" content=""/>
                <link rel="canonical" href="https://learnify.ca/blog/change"/>
                <title>Learnify | Blog</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="posts" role="main">
                    <header role="banner">
                        <h1 className="title">Why Change is Necessary</h1>
                        <h2></h2>
                        <img src={banner} className="banner" alt="Why Change is Necessary banner image"/>
                    </header>
                    <article role="document">

                    </article>
                    <aside role="complementary">
                        <img/>
                        <div>Rich</div>
                    </aside>
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default Change;