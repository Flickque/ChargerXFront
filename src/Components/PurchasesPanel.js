import React, { Component, useState } from "react";
import {Container, Table,  Badge, Button} from 'react-bootstrap';
import styles from "./PurchasePanel.module.css";
import axios from "axios";
import AuthService from "../services/auth";

export default class ChargersPanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPurchases()
    }

    payClick(id){
        axios.post(AuthService.baseAddress + '/pay', {id:id}, this.props.getAuth())
            .then(results => {

            }).catch(error =>
            {
                console.log(error)
            }
        )
        this.props.getPurchases()
    }

    getDate(date){
        if (date===null || date===0 || date==='')
            return "No date"
        else
            return new Date(date*1000).toLocaleTimeString()
    }

    render() {

        return (
            <Container fluid>
                <h1 className="mt-4 mb-4">Purchases</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>UID</th>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Time start</th>
                        <th>Time end</th>
                        <th>Charge Amount</th>
                        <th>Total Amount</th>
                        <th>Payed</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.purchases.map(purchase => (

                            <tr key={purchase.uid + purchase.date_start}>
                                <td>{purchase.uid}</td>
                                <td>{purchase.title}</td>
                                <td>{purchase.adress}</td>
                                <td>{this.getDate(purchase.date_start*1)}</td>
                                <td>{this.getDate(purchase.date_end*1)}</td>
                                <td>{purchase.power} KW</td>
                                <td>{
                                    (purchase.total_amount===null || purchase.total_amount*1===0) ? ((purchase.active*1===1) ? "Counting" : "Free") : purchase.total_amount + "€"}</td>
                                <td>{purchase.payed*1===0
                                    ? <Badge variant="warning">Not payed</Badge>
                                    : <Badge variant="success">Payed</Badge>}
                                    {(purchase.total_amount===null || purchase.total_amount*1===0) ? <div></div>: (purchase.payed*1===0) ? (<Button onClick={() =>this.payClick(purchase.id)} className={styles.pay}>Pay</Button>) : <div></div>}
                                </td>
                                <td>{purchase.active*1===0
                                    ? <Badge variant="warning">Finished</Badge>
                                    : <Badge variant="success">Active</Badge>}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Container>
        )
    }
}