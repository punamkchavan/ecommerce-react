import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";

const NotFound = () => {
    return (
        <div className="PageNotFound">
            <MdError />

            <p>Page Not Found </p>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;
