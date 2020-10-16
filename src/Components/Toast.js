import React, {Component, useState} from 'react';
import {Col, Toast, Row, Button} from 'react-bootstrap';

class MyToast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.errorHandler();

    }

    render() {
        return (
            <Toast show={this.props.error.status} onClick={this.handleClick}>
                <Toast.Header>
                    <strong className="mr-auto">Error!</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body>{this.props.error.body.toString()}</Toast.Body>
            </Toast>
        );
    }



}

export default MyToast