import React from "react";
import Helmet from "react-helmet";

import "./NotFound.scss";

export default () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Resources could not be found."/>
                <meta name="keywords" content="Not, Found"/>
                <title>Learnify | Page Not Found</title>
            </Helmet>
            <main role="main">

            </main>
        </>
    );
};