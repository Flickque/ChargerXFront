import React, { Component, useState } from "react";
import {Container, Card, ButtonGroup, Button, Badge, Row, ProgressBar, Modal, Form} from 'react-bootstrap';
import styles from "./ChargersPanel.module.css"
import Toast from "../Components/Toast";
import clsx from 'clsx';

function PurchaseStatus(props){
    return (
        <div>
            <p>{props.props.purchase.id}</p>
            <p>{props.props.purchase.user_id}</p>
            <p>{props.props.purchase.time_amount}</p>
            <p>{props.props.purchase.startTime}</p>
            <p>{props.props.purchase.endTime}</p>
            <p>{props.props.activePurchase + ''}</p>
        </div>
    )
}

export default class ChargersPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chargers: [],
            time_amount: 0,
            bam: 0
        };
        this.handleChange = this.handleChange.bind(this)
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

    blockCards(){
        if (this.props.active) return styles.blocked
    }

    showActiveCard(id){
        if (id===this.props.purchase.id) return styles.notBlocked
    }


    render() {
        /*<PurchaseStatus props={this.props}/>*/
        return (
            <Container fluid>

                <Toast error={this.props.error} errorHandler={this.props.errorHandler}/>

                <h1 className="mt-4 mb-4">Car chargers</h1>
                <Row>
                    {
                        this.props.chargers.map(charger => (
                            <Card className={clsx("col-md-3", this.showActiveCard(charger.id), this.blockCards())} key={charger.id}>
                                <Card.Body>
                                    <Badge className="mb-2" variant={(this.props.active && charger.id===this.props.purchase.id) ? "success" : "info"}>{(this.props.active && charger.id===this.props.purchase.id) ? "Charging" : "Ready"}</Badge>
                                    <Card.Title><b>{charger.title}</b></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"><i>{charger.adress}</i></Card.Subtitle>
                                    <Card.Text><b>UID:</b> {charger.uid}</Card.Text>
                                    <Card.Text><b>Socket:</b> {charger.socket}</Card.Text>
                                    <Card.Text><b>Type:</b> {charger.type}</Card.Text>
                                    <Card.Text><b>Price:</b> {(charger.price==0) ? "free" : charger.price}</Card.Text>
                                    <Card.Text><b>Power:</b> {charger.power}</Card.Text>
                                    {
                                        (charger.id===this.props.purchase.id && this.props.active
                                            &&<ProgressBar className="mt-3" animated now={100} label={'Charging'}/>
                                        )

                                    }
                                    {
                                        charger.price==0.2 &&
                                        <Form>
                                            <Form.Label><i>Number of minutes:</i></Form.Label>
                                            <Form.Control type="number" name="time_amount" min="0" defaultValue={0}  onChange={this.handleChange} placeholder="Minutes" />
                                        </Form>
                                    }
                                    {
                                        (this.props.isAuthenticated&&
                                            <ButtonGroup aria-label="Basic example" className="d-flex mt-3 justify-content-center">
                                                <Button variant="primary" onClick={() => this.handleStartClick(charger, this.state.time_amount)}>
                                                    Start
                                                </Button>
                                                <Button variant="danger" onClick={() => this.handleStopClick(charger)}>
                                                    Stop
                                                </Button>
                                            </ButtonGroup>
                                        )
                                    }

                                </Card.Body>
                            </Card>
                        ))
                    }


                </Row>
            </Container>
        )
    }
}