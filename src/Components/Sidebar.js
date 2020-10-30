import React, { Component } from "react";
import {Nav} from 'react-bootstrap';
import styles from "./Sidebar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, withRouter } from "react-router-dom";
import clsx from 'clsx';
import pages from '../Pages/pages.json'

library.add(fas);


let Tag = ({ tag: Tag, style: style}) => (
    <Tag className={style} />
)

const CurrentRoute = ({ children }) => {
    const location = useLocation();
    console.log(location.pathname);
    return children;
};

function sidebarStyle(props) {
    const isToggled = props.isToggled;
    if (isToggled) {
        return clsx(styles.sidebar, styles.toggled)
    }
    return clsx(styles.sidebar)
}

function itemStyle(props) {
    const isToggled = props.isToggled;
    if (isToggled) {
        return clsx(styles.item, styles.activeLink)
    }
    return clsx(styles.item)
}

function SideLink(props){
    if (props.page.render=="spa"){
        return (
            <Link to={props.page.path}>
                <FontAwesomeIcon icon={props.page.icon} className={styles.icon} />
                <p>{props.page.name}</p>
            </Link>
        )
    }
    /* it was for just a test */
    else if (props.page.render=="ssa"){
        return (
            <Nav.Link href={props.page.path}>
                <FontAwesomeIcon icon={props.page.icon} className={styles.icon} />
                <p>{props.page.name}</p>
            </Nav.Link>
        )
    }
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: this.props.location.pathname,
            search: this.props.location.search
        }
    }


    render() {

        return(

            <Nav defaultActiveKey="/" className={sidebarStyle(this.props)}>
                {

                    pages.map(page => (
                        !(this.props.isAuthenticated&&page.name=="Login")&&(
                            <Nav.Item className={itemStyle(this.props)} key={page.key}>
                                <SideLink page={page} />
                            </Nav.Item>
                        )
                    ))

                }
            </Nav>
        )
    }
}

export default withRouter(Sidebar);


