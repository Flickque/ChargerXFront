import React, { Component, useState } from "react";
import Search from "../Components/Search";
import Logo from "../Components/Logo";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { HiUserCircle, HiMenu, HiX } from "react-icons/hi";
import styles from "./Header.module.css"
import clsx from "clsx"
import Auth from '../services/auth';
import {Link} from "react-router-dom";

function NavItems(props){
    if (props.auth){
        return (
            <>
                <p>{props.data.username}</p>
                <NavDropdown title={<HiUserCircle className={styles.icon}/>} id="nav-dropdown" >
                    <NavDropdown.ItemText>
                        <Link to="/profile">Profile</Link>
                    </NavDropdown.ItemText>
                    <NavDropdown.ItemText>
                        <Link to="/purchases">Purchases</Link>
                    </NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={props.handle}>Logout</NavDropdown.Item>
                </NavDropdown>
            </>
        )
    }
    else{
        return(
            <>
                <p></p>
                <NavDropdown title={<HiUserCircle className={styles.icon}/>} id="nav-dropdown" >
                    <NavDropdown.Item href="/login">
                        Login
                    </NavDropdown.Item>
                </NavDropdown>
            </>
        )
    }
}

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
    }

    handleClick() {
        this.props.handle();
    }

    logoutClick(){
        Auth.logout();
    }

    render() {


        return (
            <Navbar className={styles.headerWrap}>
                {
                    this.props.isToggled
                    ?
                    <HiX className={styles.menu} onClick={this.handleClick}/>
                    :
                    <HiMenu className={styles.menu} onClick={this.handleClick}/>
                }
                <Logo/>
                <Search getMapCenterData={this.props.getMapCenterData} />
                <Navbar.Collapse id="basic-navbar-nav" className={clsx(styles.navBar, "justify-content-end")}>
                    <Nav>
                        <NavItems handle={this.logoutClick} auth={Auth.isAuth()} data={JSON.parse(Auth.getAxiosAuth().auth)}></NavItems>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}