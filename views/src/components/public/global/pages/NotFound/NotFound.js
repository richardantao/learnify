import React from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import "./NotFound.scss";

const NotFound = () => {
    const location = useLocation();
    
    return (
        <>
            <Helmet>
                <meta name="description" content="The resource you requested could not be found on Learnify"/>
                <meta name="keywords" content="error, not found, lost, misplaced, 404"/>
                <title>404 Error</title>
            </Helmet>
            <main className="not-found" role="main">
                <h1>Resource Not Found</h1>
                <p>
                    We couldn't find anything located at <code>{location.pathname}</code>.
                </p>

                <a href="/">Go back to Public Homepage</a>
                <a href="/dashboard">Go back to App Dashboard</a>
            </main>
        </>
    );  
};

export default NotFound;