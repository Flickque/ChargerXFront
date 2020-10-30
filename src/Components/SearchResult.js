import React, { Component } from "react";
import {ListGroup} from "react-bootstrap";
import styles from "./Search.module.css"
import {Link} from "react-router-dom";


export default class SearchResult extends Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.getMapCenterData()
    }

    render() {

        return(
            <ListGroup>
                <div className={styles.searchResult}>
                    {

                        this.props.search.map(charger => (

                            <ListGroup.Item key={charger.uid}>
                                {charger.adress},
                                {charger.title},
                                <a onClick={this.handleClick} href={"/?lat=" + charger.latitude + "&lng=" + charger.longitude}>
                                    Lat: {charger.latitude},
                                    Ltd: {charger.longitude}
                                </a>
                            </ListGroup.Item>


                        ))

                    }
                </div>
            </ListGroup>
        )
    }
}
