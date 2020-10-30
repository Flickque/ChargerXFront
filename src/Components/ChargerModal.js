import React, { Component } from 'react';
import { Button, Modal, ProgressBar, ListGroup, Badge, Form } from 'react-bootstrap';


class ChargerModal extends Component{
    constructor(props) {
        super(props);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            time_amount:10
        }
    }

    handleMapClick(){
        this.props.handleMapClick();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleStartClick(charger, time_amount){

        let purchase = {
            id: charger.id,
            time_amount: time_amount,
            startTime: Math.floor(new Date().getTime() / 1000),
            endTime: "",
        }
        this.props.start( purchase )

    }

    handleStopClick(charger){

        let purchase = {
            id: charger.id,
            time_amount: this.props.purchase.time_amount,
            startTime: this.props.purchase.time_amount,
            endTime: Math.floor(new Date().getTime() / 1000),
        }
        this.props.stop( purchase )
    }


    render() {

        return (
                <Modal show={this.props.isClicked} onHide={this.handleMapClick} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.data.title}</Modal.Title>
                        <Badge variant={(this.props.active && this.props.data.id===this.props.purchase.id) ? "success" : "info"}>{(this.props.active && this.props.data.id===this.props.purchase.id) ? "Charging" : "Ready"}</Badge>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>UID: <b>{this.props.data.uid}</b></ListGroup.Item>
                            <ListGroup.Item>Adress: <b>{this.props.data.adress}</b></ListGroup.Item>
                            <ListGroup.Item>Type: <b>{this.props.data.type}</b></ListGroup.Item>
                            <ListGroup.Item>Socket: <b>{this.props.data.socket}</b></ListGroup.Item>
                            <ListGroup.Item>Power: <b>{this.props.data.power}</b></ListGroup.Item>
                            <ListGroup.Item>Price: <b>{this.props.data.price}</b></ListGroup.Item>
                        </ListGroup>

                    </Modal.Body>
                    {
                        (this.props.data.id===this.props.purchase.id && this.props.active
                            &&<ProgressBar animated now={100} label={'Charging'}/>
                        )
                    }
                    {
                        (this.props.isAuthenticated&&
                            <Modal.Footer className="justify-content-center">
                                {
                                    this.props.data.price==0.2 && (
                                        <Form>
                                            <Form.Control type="number" name="amount" value={this.state.time_amount} onChange={this.handleChange} placeholder="Enter amount" />
                                        </Form>
                                    )
                                }
                                <Button variant="primary" onClick={() => this.handleStartClick(this.props.data, this.state.time_amount)}>
                                    Start
                                </Button>
                                <Button variant="danger" onClick={() => this.handleStopClick(this.props.data)}>
                                    Stop
                                </Button>
                            </Modal.Footer>
                        )
                    }

                </Modal>
        );
    }
}

export default ChargerModal