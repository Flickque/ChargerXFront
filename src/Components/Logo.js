import styles from "./Logo.module.css";
import logo from "../assets/img/logo.png";
import {Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

function Header(){
    return(
        <div>
            <Link to="/" className={styles.logoWrap}>
                <img className={styles.logo} src={logo} />
                <Navbar.Brand className={styles.title}>ChargingX</Navbar.Brand>
            </Link>
        </div>

    )
}

export default Header;
