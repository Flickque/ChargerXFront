import React from 'react';
import {Jumbotron, Container, Alert, Form, Button, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userService } from '../services/user.service';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        //userService.logout();

        this.state = {
            user:{
                username: '',
                email: '',
                password: ''
            },
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

        this.setState({ submitted: true })
        ;
        const { username, email, password } = this.state;

        // stop here if form is invalid
        if (!(username && email && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.register(username, email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <Jumbotron fluid className="m-5">
                <Container>
                    <Alert variant="info">
                        Hello! Please, type in your info!
                    </Alert>
                    <h2>Register</h2>
                    <Form noValidate validated={submitted} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" required onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Please type in name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="Email" placeholder="Enter email" required onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Please type in email
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required onChange={this.handleChange} />
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
                            Register
                        </Button>
                        {error &&
                        <Alert variant="danger">
                            {error}
                        </Alert>
                        }
                        <div>
                            <Link to="/login">Already registered? Login</Link>
                        </div>
                    </Form>
                </Container>
            </Jumbotron>
        );
    }
}

export default SignUp ;


