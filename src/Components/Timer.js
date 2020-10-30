import React, { Component, useState } from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(new Date().getTime()-this.props.date*3600)};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState(state => ({
            date: new Date(state.date.getTime()-1000)
        }));

    }

    render() {
        return (
            <div>
                <p>Now {this.state.date.toLocaleTimeString()}.</p>
            </div>
        );
    }
}

export default Timer