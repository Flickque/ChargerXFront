import React, { Component } from "react";
import {Container, ListGroup,  FormControl, InputGroup} from 'react-bootstrap';
import AuthService from '../services/auth';

export default class ProfilePanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        return (
            <Container fluid>
                <h1 className="mt-4 mb-4">Profile</h1>
                <ListGroup>
                    <ListGroup.Item>
                        <b>Name</b>: {this.props.user.name}
                    </ListGroup.Item>
                    <ListGroup.Item><b>Email:</b> {this.props.user.email}</ListGroup.Item>
                    <ListGroup.Item><b>Money:</b> {this.props.user.money}</ListGroup.Item>
                </ListGroup>
            </Container>
        )
    }
}