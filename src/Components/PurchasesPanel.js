import React, { Component, useState } from "react";
import {Container, Table,  Badge} from 'react-bootstrap';

export default class ChargersPanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPurchases()
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
                        <th>Charge Amount</th>
                        <th>Total Amount</th>
                        <th>Payed</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.purchases.map(purchase => (

                            <tr key={purchase.id}>
                                <td>{purchase.uid}</td>
                                <td>{purchase.title}</td>
                                <td>{purchase.adress}</td>
                                <td>{purchase.power} KW</td>
                                <td>{(purchase.total_amount==null) ? 0 : purchase.total_amount}</td>
                                <td>{purchase.payed!==0
                                    ? <Badge variant="success">Payed</Badge>
                                    : <Badge variant="warning">Not payed</Badge>}
                                </td>
                                <td>{purchase.active!==0
                                    ? <Badge variant="success">Active</Badge>
                                    : <Badge variant="warning">Finished</Badge>}
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