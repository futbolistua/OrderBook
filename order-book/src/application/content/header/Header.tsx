import React from "react";
import "./styles/header.scss";

const logo = require("./resources/taas-fund-logo.svg");

export default function Header() {
    return (
        <div className="header">
            <img className="header__logo" src={logo} alt="logo" />
        </div>
    );
}