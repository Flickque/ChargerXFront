import styles from "./Logo.module.css";
import logo from "../assets/img/logo.png";
import {Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

function Header(){
    return(
        <a>
            <a href="/" className={styles.logoWrap}>
                <img className={styles.logo} src={logo} />
                <Navbar.Brand className={styles.title}>ChargingX</Navbar.Brand>
            </a>
        </a>

    )
}

export default Header;
