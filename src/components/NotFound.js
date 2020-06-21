import React from "react";
import logo from '../logo.svg';

const NotFound = () => {
    return (
        <div className="page-404">
            <span className="nr">404</span>
            <h1> Nic tu nie ma. Zgubiłeś się :-(</h1>
            <img src={logo} className="snail-logo" alt="logo" />
        </div>
    )
};

export default NotFound;