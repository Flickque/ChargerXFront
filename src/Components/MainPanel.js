import React, { Component, useState } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ChargerModal from "./ChargerModal";
import styles from "./MainPanel.module.css"
import icon from "../assets/img/petrol-station.svg"

export class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            chargers: [],
            activeCharger: []
        };

        this.handleMapClick = this.handleMapClick.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
        this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
    }

    handleMapClick() {
        this.setState(state => ({
            isClicked: !state.isClicked
        }));

    }

    onMarkerClick(props, marker, e) {
        this.handleMapClick()
        this.setState({activeCharger: props.charger})

    }

    onMouseoverMarker(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onMouseoutMarker(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: false
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {


        return (
            <div>

                <ChargerModal
                    isAuthenticated = {this.props.isAuthenticated}
                    data={this.state.activeCharger}
                    purchase={this.props.purchase}
                    active={this.props.active}
                    isClicked={this.state.isClicked}
                    handleMapClick={this.handleMapClick}
                    start={this.props.start}
                    stop={this.props.stop}
                >

                </ChargerModal>

                <Map
                    google={this.props.google}
                    zoom={8}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat:65.059274,
                        lng:25.455584
                    }}
                    className={styles.map}
                >
                    {
                        this.props.chargers.map( charger => (
                            <Marker
                                charger={charger}
                                position={{lat: charger.latitude, lng: charger.longitude}}
                                onClick={this.onMarkerClick}
                                key={charger.id}
                                icon={{
                                    url: icon,
                                    anchor: new this.props.google.maps.Point(32,32),
                                    scaledSize: new this.props.google.maps.Size(50,50)
                                }}


                            />
                        ))

                    }

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAmE0JB8YaxRry0zgD5VFQF9e1VqDGbJVE")
})(MainPanel)
