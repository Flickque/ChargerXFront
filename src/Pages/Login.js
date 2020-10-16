import React from 'react';
import {Jumbotron, Container, Alert, Form, Button, Spinner, ListGroup} from 'react-bootstrap';
import { userService } from '../services/user.service';
import {Link, Redirect, Route} from "react-router-dom";
import Auth from "../services/auth"




class Login extends React.Component {
    constructor(props) {
        super(props);

        //userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });

        Auth.authenticate(username, password)
        .then(result =>
        {
            console.log(result);
            this.props.loginSuccess();
            this.props.history.push(this.props.redirectPathOnSuccess);
        })
        .catch(() => {
            this.props.loginFail();
        })
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <Jumbotron fluid className="m-5">
                <Container>
                    <Alert variant="info">
                        Hello! Please, type in your info!<br/>
                        Login: admin<br/>
                        Password: 123456
                    </Alert>
                    <h2>Login</h2>
                    <Form noValidate validated={submitted} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicLogin" >
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="text" name="username" value={username} placeholder="Enter login"  required onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Please type in login
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} placeholder="Password"  required onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Please type in password
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" disabled={loading} type="submit">
                            {loading &&
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                            Login
                        </Button>
                        {error &&
                        <Alert variant="danger">
                            {error}
                        </Alert>
                        }
                    </Form>
                </Container>
            </Jumbotron>
        );
    }
}

export default Login ;



