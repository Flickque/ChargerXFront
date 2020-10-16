import React, { Component } from "react";
import {Button, Form, FormControl, ListGroup} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import styles from "./Search.module.css"
import clsx from 'clsx';


function SearchResult(){
    return(
        <div className={styles.searchResult}>
            <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.handleFormClick = this.handleFormClick.bind(this);
    }

    handleFormClick(){
        this.setState(state => ({
            data: []
        }));
    }

    render() {

        return(
            <div>
                <SearchResult />
                <Form inline>
                    <FormControl type="text" placeholder="Search" className={clsx(styles.search, "mr-sm-2")} onClick={this.handleFormClick} />
                    <Button variant="outline-success"><BsSearch/></Button>
                </Form>
            </div>

        )
    }
}
