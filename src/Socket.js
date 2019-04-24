import React from 'react';
import './App.css';

import { subscribeToTimer } from './api';

class SocketTest extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            timestamp: 'no timestamp yet'
        }

        subscribeToTimer( (err, timestamp) => this.setState({
            timestamp,
        }) );
    }

    render(){
        return (
            <p>this is the server's timer value: {this.state.timestamp}</p>
        );
    };
}

export default SocketTest;